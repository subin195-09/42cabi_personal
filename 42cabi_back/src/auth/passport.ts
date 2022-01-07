import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
const Strategy = require('passport-42');
const env = process.env;

passport.serializeUser(function(user:any, done:any) {
	console.log('serializeUser', user);
	return done(null, user);
});

passport.deserializeUser(function(user:any, done:any) {
	console.log('deserializeUser');
	return done(null, user);
});

const FortyTowOpt = {
	clientID : env.FORTY_TOW_CLIENT_ID,
	clientSecret : env.FORTY_TOW_CLIENT_SECRET,
	callbackURL : env.FORTY_TOW_CALLBACK_URL,
	passReqToCallback : true
};

const FortyTwoVerify = (req:any, accessToken:any, refreshToken:any, profile:any, cb:any) => {
	const user = {
		username: profile.username,
        displayname: profile.displayName,
        email: profile.emails[0].value,
        userid: profile.id,
        access: accessToken,
        refresh: refreshToken,
	};
	console.log(user);
	// console.log(profile);
    // console.log(`accessToken : ${accessToken}`);
    // console.log(`refreshToken: ${refreshToken}`);
	return cb(null, user);
}

export default function passportUse() {
	passport.use(new Strategy(FortyTowOpt, FortyTwoVerify));
}
