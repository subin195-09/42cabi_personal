import * as express from 'express';

const router = express.Router();

router.get('/', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
	res.render('index');
});

export default router;
