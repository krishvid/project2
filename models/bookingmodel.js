const mongoose=require('mongoose')
const Schema= mongoose.Schema

const BookingSchema= new Schema({
    customername:{
        type: String,
        
    },
    room_type:{
        type: String,
        
    },
    dateCheckIn:{
        type: Date,
        
    },
    dateCheckOut:{
        type: Date,
       
    },
    timeCheckIn:{
        type: String,
        
    },
    timeCheckOut:{
        type: String,
        
    },
    numofpeople:{
        type: Number,
        
    }
})

module.exports=mongoose.model('bookings',BookingSchema)