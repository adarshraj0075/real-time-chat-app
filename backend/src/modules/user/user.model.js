const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);