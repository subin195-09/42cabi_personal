import fs from 'fs';
import mariadb from 'mariadb'

// const mysqlssh = require('mysql-ssh');

// const db = () => {
// mysqlssh.connect(
// 	{
// 		host: 'cabi.42cadet.kr',
// 		user: 'ec2-user',
// 		privateKey: fs.readFileSync('/Users/soobin/Desktop/42cabi_personal/key/swlabs-cadet.pem'),
// 	},
// 	{
// 		host: '127.0.0.1',
// 		user: 'root',
// 		password: '',
// 		database: '42cabi_DB'
// 	}
// )
// .then((client: any) => {
// 	client.query('SELECT * FROM user', function(err: any, result: any) {
// 		if (err) throw err;
// 		console.log(result);
// 		mysqlssh.end();
// 	})
// })

// .catch((err: any) => {
// 	console.log(err);
// })
// }

// export default db;

const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	password: '0909',
	database: 'skim_cabi'
});

export async function getUser() {
	let con, row;
	try {
		con = await pool.getConnection();
		console.log('connected');
		row = await con.query('SELECT * FROM user');
	} catch (err) {
		throw err;
	} finally {
		if (con) con.end();
		return (row);
	}
}
