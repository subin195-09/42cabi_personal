import express from 'express';
import passport from 'passport';
import authCheck from './auth/auth';

export const router = express.Router();

router.post('/hello', (req:any, res:any, next:any) => {
	console.log(req.body.data);
	res.send({
		data: '42cabi_ok'
	})
})

router.get('/auth/login', passport.authenticate('42'));
router.post('/', authCheck, function(req:any, res:any, next:any) {
	console.log('user', req.user);
	res.json({ test: req.user });
});

router.get(
	'/auth/login/callback',
	passport.authenticate('42', {
		successMessage: 'login success :>',
		successRedirect: 'http://localhost:3000/lent',
		failureMessage: 'login failed :<',
		failureRedirect: 'http://localhost:3000/'
	})
)
