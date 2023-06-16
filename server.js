const express=require('express')
const app=express()
const mongoose=require('mongoose')
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/passportconfig')
const bookingController=require("./controllers/bookingcontroller")
const userController=require('./controllers/usercontroller')
const MongoStore = require("connect-mongo");
require('dotenv').config()
const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_DB)
.then(()=>{
    console.log("connected to mongodb")
}).catch((e)=>{
    console.log(e)
})

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.set("view engine", "ejs")
app.use(expressLayouts)
app.use(
    session({
      secret: process.env.SECRET,
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 360000 },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB, //Store session in mongodb to preview re-login on server reload
      }),
    })
  );
  //-- passport initialization
  app.use(passport.initialize());
  app.use(passport.session());
app.use(function (request, response, next) {
    // before every route, attach the flash messages and current user to res.locals
    //response.locals.alerts = request.flash(); //{ success: [], error: []}
    response.locals.currentUser = request.user; //Makes logged in user accessibile in ejs as currentUser.
    next();
  });
app.use("/", bookingController)
app.use('/user',userController)

app.listen(PORT, ()=>{
    console.log(`running on ${PORT}`)
})