import mariadb from 'mariadb'

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
