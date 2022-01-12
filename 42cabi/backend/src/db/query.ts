import {user, lent, cabinetList, cabinetInfo, cabinetLent} from '../user'

//사용자 확인 - 사용자가 없는 경우, addUser, 있는 경우, getUser
export function checkUser(client:any){
	const content:string = `select * from user where user_id = ${user.user_id}`;
	client.query(content).then((err:any, res:any)=>{
		if (err) throw err;
		console.log(res);
		if (!res.length)
			addUser(client);
		else
			getUser(client);
	});
}

//사용자가 없는 경우, user 값 생성
export function addUser(client:any){
	const content:string = `insert into user value('${user.user_id}', '${user.intra_id}', '${user.auth}', '${user.email}', '${user.phone}')`;
	client.query(content).then((err:any, res:any)=>{
		if (err) throw err;
		console.log(res);
	});
}
//본인 정보 및 렌트 정보 - 리턴 페이지
export function getUser(client:any){
	const content:string = `select * from lent where lent_user_id=${user.user_id}`;
	client.query(content).then((err:any, res:any)=>{
		if (err) throw err;
		console.log(res);
		console.log(typeof res);
		if (res.length !== 0){ // lent page
			lent.lent_id = res[0].lent_id;
			lent.lent_cabinet_id = res[0].lent_cabinet_id;
			lent.lent_user_id = res[0].lent_user_id;
			lent.lent_time = res[0].lent_time;
			lent.expire_time = res[0].expire_time;
			lent.extension = res[0].extension;
		}
		// console.log(res.length);
	});
}
//lent & user
export function getLentUser(client:any){
	const content = `select u.intra_id, l.* from user u right join lent l on l.lent_user_id=u.user_id`;
	console.log('getLentUser');
	client.query(content).then((err:any, res:any)=>{
		if (err) throw err;
		console.log(res);
		for (let i = 0; i < res.length; i++){
			cabinetLent.push(res[i]);
		}
	});
}
//location info
export function locationInfo(client:any){
	const content:string = `select distinct cabinet.location from cabinet`;

	// console.log('location info');
	const result = client.query(content);
	result.forEach(async (element:any)=>{
		cabinetList.location?.push(result.location);
		floorInfo(client, result.location);
	});
}
//floor info with exact location
export function floorInfo(client:any, location:string):Array<number>{
	const content:string = `select distinct cabinet.floor from cabinet where location='${location}' order by floor`;
	let floorList:Array<number> = [];
	let list:Array<Array<string>> = [];
	let tmpCabinetList:Array<Array<Array<cabinetInfo>>> = [];

	// console.log('floor info');
	const result = client.query(content);
	result.forEach(async (element:any)=>{	 
		floorList.push(result.floor);
	 	list.push(sectionInfo(client, location, element.floor, tmpCabinetList));
	});
	cabinetList.floor?.push(floorList);
	cabinetList.section?.push(list);
	cabinetList.cabinet?.push(tmpCabinetList);
	return floorList;
}
//section info with exact floor
export function sectionInfo(client:any, location:string, floor:number, list:any):Array<string>{
	const content:string = `select distinct cabinet.section from cabinet where location='${location}' and floor=${floor} order by section`;
	let sectionList:Array<string> = [];
	let cabinetList:Array<Array<cabinetInfo>> = [];

	// console.log('section info');
	const result = client.query(content);
	result.forEach(async (element:any)=>{
	 	sectionList.push(result.section);
	 	cabinetList.push(getCabinetInfo(client, location, floor, result.section));
	})	
	list.push(cabinetList);
	return sectionList;
}
export function getCabinetInfo(client:any, location:string, floor:number, section:string):Array<cabinetInfo>{
	const content:string = `select * from cabinet where location='${location}' and floor=${floor} and section='${section}' and activation=1 order by cabinet_num`;
	let cabinetList:Array<cabinetInfo> = [];

	const result = client.query(content);
	result.forEach((element:any)=>{
		cabinetList.push(element);
	});	
	return cabinetList;
}
//lent 값 생성
export function createLent(client:any, cabinet_id:number){
	const content:string = `INSERT INTO lent (lent_cabinet_id, lent_user_id, lent_time, expire_time, extension) VALUES (${cabinet_id}, ${user.user_id}, now(), ADDDATE(now(), 30), 0)`;
	client.query(content).then((err:any, res:any)=>{
		if (err) throw err;
		console.log(res);
	  });
}

//lent_log 값 생성 후 lent 값 삭제 (skim update)
export function createLentLog(client:any){
	const content:string = `select * from lent where lent_user_id=${user.user_id}`;
	client.query(content).then((err:any, res:any)=>{
		if (err) throw err;
		if (res[0] === undefined)
			return ;
		const lent_id = res[0].lent_id;
		const user_id = res[0].lent_user_id;
		const cabinet_id = res[0].lent_cabinet_id;
		const lent_time = res[0].lent_time;
		client.query(`insert into lent_log (log_user_id, log_cabinet_id, lent_time, return_time) values (${user_id}, ${cabinet_id}, '${lent_time}', now())`);
		client.query(`delete from lent where lent_cabinet_id=${lent_id}`)
		lent.lent_id = -1;
		lent.lent_cabinet_id = -1;
		lent.lent_user_id = -1;
		lent.lent_time = '';
		lent.expire_time = '';
		lent.extension = false;
	});
}
