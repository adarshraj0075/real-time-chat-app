require ("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const authRoute=require("./modules/auth/auth.routes");
const auth=require("./middleware/auth");

const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({msg:"Api running"})
})

//for testing purpose of the auth middleware this is temp
app.get("/api/protected",auth,(req,res)=>{
    res.json({userId:req.userId})
})

app.use("/api/auth",authRoute)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongo connected");
    app.listen(process.env.PORT,()=>{
        console.log("server connected")
    });

})
.catch(console.error)
