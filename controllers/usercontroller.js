const express=require('express')
const router=express.Router()
const passport= require('passport')
const User= require('../models/usermodel')
const userCheck=require('../config/usercheck.config')

router.get("/register",(req,res)=>{
    res.render('auth/register')
})

router.get("/lock", userCheck, (req,res)=>{
    console.log(req.user)
    res.render("lock")
})

router.post("/register", async (req,res)=>{
    try{
        console.log(req.body)
        const user=new User(req.body)
        await user.save()
        res.redirect("/user/login")
    }catch(e){
        console.log(e)
    }
})

router.get('/logout', function(req,res,next){
    req.logout(function(e){
        if(e){ return next(e);}
        res.redirect('/');
    });
});
router.get("/login",(req,res)=>{
    res.render("auth/login")
})

router.post('/login',passport.authenticate( 'local', {
    successRedirect: '/user/lock',
    failureRedirect: '/user/login'
}));

module.exports = router