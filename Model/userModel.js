const mongoose=require('mongoose');
const Schema=mongoose.Schema

const userSchema=new Schema({
   name:{
      type:String,
      require:true
   },
   email:{
      type:String,
      require:true
   },
   phone:{
      type:String,
      require:true
   },
   password:{
      type:String,
      require:true
   },
   role:{
      type:String,
      enum:["USER","SELLER","ADMIN"],
      default:"USER"
   },
   status:{
      type:String,
      enum:["ACTIVE","INACTIVE"]
   }
   
},
{
timestamps:true 
}
)
const userModel=mongoose.model('rolluser',userSchema)
module.exports=userModel

//if send image (default:false)