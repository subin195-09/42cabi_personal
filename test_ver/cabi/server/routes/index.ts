import * as express from 'express';

const router = express.Router();

router.get('/', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
	res.send({greeting: "Hello React x Node.js"});
});

export default router;
