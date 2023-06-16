module.exports = function(req, res, next) {
    //console.log(req)
    if(!req.user){
        res.redirect("/user/login")
    }else{
     next()
    }
}