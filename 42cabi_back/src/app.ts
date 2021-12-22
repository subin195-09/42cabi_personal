import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('welcome!');
});

const swaggerSpec = YAML.load(path.join(__dirname, './swagger.yaml'));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen('8080', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 8080
  ################################################
`);
});
