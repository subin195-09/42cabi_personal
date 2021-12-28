import express from 'express'
import path from 'path';
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
import { getUser } from './db';

function makeServer(){
	const app = express();
	const port = 4242;

	app.use('/db', function(req, res){
		getUser().then((row) => {
			res.send(row);
		})
	});

	const swaggerSpec = YAML.load(path.join(__dirname, '../api/swagger.yaml'));
	app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

	app.use(express.static(path.join(__dirname, '../public')));
	app.use('/', function(req, res){
		res.sendFile(path.join(__dirname, '../public/index.html'));
	});
	
	app.listen(port, ()=>console.log(`Listening on port ${port}`));
}

makeServer();
