const passport=require('passport')
const localStratrgy= require('passport-local')
const User= require('../models/usermodel')

passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id,cb){
    User.findById(id).then(user =>{
        cb(null, user)
    }).catch(e =>{
        cb(e, false)
    })
})



passport.use(new localStratrgy({
    usernameField: "email",
    passwordField: "password"
},function (email, password, cb) {
    User.findOne({ email: email}).
        then(user => {
        if(!user) {
            console.log(user)
            return cb(null, false, { message: "User not found"} )
        }
        //check if password is a match
        if(!user.validPassword(password)){
           console.log(user)
            return cb(null, false, { message: "Password not a match"} )
            
        }
        return cb(null,user)
            }).catch(e => {
        cb(e)
    })
}));


module.exports = passport