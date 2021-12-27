import express from 'express'
import path from 'path';
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

function makeServer(){
	const app = express();
	const port = 4242;

	const mysql = require('mysql');
	const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '0909',
	database: 'skim_cabi'
	});

	app.use('/db', function(req, res){
		con.connect(function(err: any) {
			if (err) throw err;
			console.log('connected');
		});

		con.query('SELECT * FROM user', function (err: any, result: any, fields: any) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
	});

	const swaggerSpec = YAML.load(path.join(__dirname, './swagger.yaml'));
	app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
	app.listen(port, ()=>console.log(`Listening on port ${port}`));

	app.use(express.static(path.join(__dirname, '../public')));
	app.use('/', function(req, res){
		res.sendFile(path.join(__dirname, '../public/index.html'));
	});
}

makeServer();
