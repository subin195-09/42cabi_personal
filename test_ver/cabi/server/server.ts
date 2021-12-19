import express from 'express';

const app = express();

import indexRouter from "./routes/index";

app.use('/', indexRouter);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
