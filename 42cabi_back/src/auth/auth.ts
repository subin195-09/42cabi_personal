export default function authCheck(req:any, res:any, next:any){
	console.log(req.user);
	if (req.user) {
		console.log('success auth');
		next();
	}
	else {
		console.log('fail auth');
		res.status(401).json({
			authenticated: false,
			message: 'User has not been authenticated'
		});
	}
}
