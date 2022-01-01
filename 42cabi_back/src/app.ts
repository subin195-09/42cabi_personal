import express from 'express'
import path from 'path';
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
import cors from 'cors';
import { getUser } from './db';
import { router } from './route'
// import db from './db';

function makeServer(){
	const app = express();
	const port = 4242;

	app.use(
		cors({
			origin: "http://localhost:3000",
			methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true
		})
	);

	app.use('/', router);

	app.use('/db', function(req, res){
		getUser().then((row) => {
			res.send(row);
		})
	});
	// app.use('/db', function(req, res){
	// 	db();
	// 	res.send('db connect');
	// });

	const swaggerSpec = YAML.load(path.join(__dirname, '../api/swagger.yaml'));
	app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

	app.use(express.static(path.join(__dirname, '../public')));
	app.use('/', function(req, res){
		res.sendFile(path.join(__dirname, '../public/index.html'));
	});

	app.listen(port, ()=>console.log(`Listening on port ${port}`));
}

makeServer();
