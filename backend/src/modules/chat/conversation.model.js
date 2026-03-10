const { ref } = require("joi");
const mongoose=require("mongoose");

//how this whole schema is desined
//why we need this conversation schema

const conversationSchema=new mongoose.Schema({
    //what is this type
    type:{
        type:String,
        //what is enum why it is used
        enum:["private","group"],
        required:true
    },

    //question about member
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true
        }
    ],

    title:{
        type:String,
        default:null
    },

    //this schema only stores last msgs conversation ?
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:null
    }
},
//why timestamps is outside
{
    timestamps:true
});

module.exports=mongoose.model("Conversation",conversationSchema)