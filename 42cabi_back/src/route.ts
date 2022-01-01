import express from 'express';

export const router = express.Router();

router.post('/hello', (req:any, res:any, next:any) => {
	console.log(req);
	res.send({
		data: 'hi'
	})
})
