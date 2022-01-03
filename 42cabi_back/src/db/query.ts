import mariadb from 'mariadb'
import { user } from './data'

export function getUser(con: any) {
	con.query('SELECT * FROM user', function(err: any, result: any) {
		console.log("getUser");
		if (err) throw err;
		console.log(result);
	})
}

export function addUser(con: any) {
	con.query(`INSERT INTO user (ID, CONTENT) values (${user.content})`, user, function(err: any, result: any) {
		if (err) throw err;
		console.log(result);
	})
}
