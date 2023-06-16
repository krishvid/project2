const express=require('express')
const router=express.Router()
const bookingModel=require("../models/bookingmodel")
const userCheck=require('../config/usercheck.config')

router.get('/',userCheck,async (req,res)=>{
    try{
        const bookingList=await bookingModel.find()
        console.log(bookingList)
        res.render("index",{bookingList: bookingList})
    }catch(e){
        res.render("views/error")
    }
    
})


router.get('/bookroom',(req,res)=>{
    let message = ""
    if(req.query.type === "error") {
        message = "You cannot submit the form with an empty data"
    }
    res.render("bookroom", {message})
})



//post-to create a booking
router.post('/bookroom', async (req,res)=>{
    console.log(req.body)
    try{
        const booking= new bookingModel(req.body)
        await booking.save()
        res.redirect("/")
    }catch(e){
        console.log(e)
        res.redirect("/bookroom?type=error")
    }
})
router.get('/booking/:id/show', async (req,res)=>{
    try{
        const bookingList=await bookingModel.findOne({id: req.params.id})
        console.log(bookingList)
        res.render("show",{bookingList: bookingList})
    }catch(e){
        console.log(e)
    }
})
router.get("/booking/:id", async(req, res) => {
   console.log(req.params.id)
    try{
        const bookingList= await bookingModel.findById(req.params.id)
        console.log(bookingList)
        res.render("edit", {bookingList: bookingList})
    }catch (e) {
        console.log(e)
        res.render('edit')
    }

})


//delete-delete a booking
router.delete('/booking/:id',async(req,res)=>{
    try{
        await bookingModel.findByIdAndDelete(req.params.id)
        res.redirect('/')
    }catch(e){
        console.log(e)
    }
})


//put- to edit a booking
router.put('/booking/:id', async(req,res)=>{
    try{
        await bookingModel.findByIdAndUpdate(req.params.id, req.body)
    }catch (e) {
        console.log(e)
    } finally {
        res.redirect("/")
    }
})



module.exports = router