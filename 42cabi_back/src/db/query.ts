import mariadb from 'mariadb'
import { user } from './data'

export function getUser(con: any) {
	con.query('select * from user', function (err: any, result: any) {
		if (err) throw err;
		console.log(result);
	});
}

export function addUser(con: any) {
	console.log("addUser");
	con.query(`insert into user (id, content) values (${user.user_id}, "${user.content}")`);
}
