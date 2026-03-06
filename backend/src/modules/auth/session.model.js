const mongoose=require("mongoose");

const sessionSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        //ref is like foreign key it refers to User model
        index:true
        //index speed up the search
    },
    refreshToken:String,
    userAgent:String,
    ip:String,
    expiresAt:Date
},{timestamps:true});

module.exports=mongoose.model("Session",sessionSchema)