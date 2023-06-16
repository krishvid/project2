const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const UserModel=new Schema({
    name:{
        type:String,
        required:true
    },
    phoneno:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        //unique: true
    }, 
    password:{
        type: String,
        required: true
    }
})
UserModel.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    user.password = bcrypt.hashSync(user.password, 10);
    next();
  });
  
  UserModel.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
module.exports=mongoose.model('users',UserModel)