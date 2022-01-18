import express from 'express';
import passport from 'passport';
import authCheck from './middleware/auth';
import {cabinetList, cabinetLent, lent, user, userList, lentCabinet} from './user'
import {checkUser, createLentLog, createLent, getLentUser, getUser} from './db/query'
import {connection, connectionForID} from './db/db_dev'
import { createBrotliCompress } from 'zlib';

export const router = express.Router();

router.get('/auth/login', passport.authenticate('42'));
router.post('/', authCheck, function(req:any, res:any){
    res.json({ test: req.user });
});

router.get(
    "/auth/login/callback",
    passport.authenticate("42", {
        // successMessage: "LOGIN SUCCESS!",
        // successRedirect: "/lent",
        failureMessage: "LOGIN FAILED :(",
        failureRedirect: "/",
    }),
    function(req:any, res:any){
        try{
            connection(checkUser).then((resp:any)=>{
                if (lentCabinet.lent_id !== -1){
                    res.redirect('/return');
                }else{
                    res.redirect('/lent');
                }
            });
        }catch(err){
            console.log(err);
        }
    }
);

router.post('/auth/logout', (req:any, res:any)=>{
    // console.log(req.session);
    // console.log(req.cookies);
    req.logout();
		req.session = null;
    res.send({result: 'success'});
});

router.post("/api/cabinet", (req:any, res:any)=>{
    if (!cabinetList)
        res.status(400).json({error: "no user"});
    else
        res.send(cabinetList);
})

router.post("/api/lent_info", async (req:any, res:any)=>{
    console.log("lent_info: ", req.user);
    try{
        connection(getLentUser).then((resp:any)=>{
            const isLent = cabinetLent.findIndex((cabinet)=>(cabinet.lent_user_id == req.user.userid));
            res.send({cabinetLent: cabinetLent, isLent:isLent});
        });
    }catch(err:any){
        console.log(err);
        res.status(400);
        throw err;
    };
})

router.post('/api/lent', (req:any, res:any)=>{
    try{
        connection(getUser).then((resp:any)=> {
        if (lentCabinet.lent_id === -1){
            connectionForID(createLent, req.body.cabinet_id);
            res.send({cabinet_id: req.cabinet_id});
        }
        else{
            res.send({cabinet_id: -1});
        }
    });
    }catch(err){
        console.log(err);
        res.status(400).send({cabinet_id: req.cabinet_id});
    }
})

router.post("/api/return_info", async (req:any, res:any)=>{
    console.log("return_info: ", req.user);
    try{
        connection(getUser).then((resp:any)=> {
		    res.send({lentCabinet : lentCabinet});
	});
    }catch(err){
        console.log(err);
        res.status(400).json({error: err});
    }
})

router.post("/api/return", (req:any, res:any)=>{
    console.log("return: ", req.user.userid);
    try{
        connectionForID(createLentLog, req.user.userid).then((resp:any) => {
            res.sendStatus(200);
        });
    }catch(err){
        console.log(err);
        res.status(400).json({error: err});
    }
})

router.post("/api/check", (req:any, res:any)=>{
    console.log('api check!!!');
		console.log(req.user);
		//console.log(req.cookies);
    if (!req.session || !req.session.passport || !req.session.passport.user){
			console.log('fail');
			res.status(400).send({result: 'failed'});
		}else{
			console.log('success');
            res.send(user);
    }
});
