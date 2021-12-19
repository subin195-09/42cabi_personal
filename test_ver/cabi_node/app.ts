import express, {Request, Response} from 'express';
import path from 'path';

const app = express();

import indexRouter from "./routes/index";

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
