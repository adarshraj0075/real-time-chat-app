const authService=require("./auth.service");

exports.signup=async (req,res)=>{
    try {
     const user=await authService.signUp(req.body);
     //new doubt why are we sending a object in res in signup why just not sending a msg that account created
     res.status(201).json({id:user._id,email:user.email})   
    } catch (e) {
        res.status(400).json({message:e.message});
    }
}

exports.login=async(req,res)=>{
    try {
        const result=await authService.login({
            ...req.body,
            userAgent:req.headers["user-agent"],
            ip:req.ip
        });
        
        res.json(result)
    } catch (e) {
      
        res.status(401).json({message:e.message});
    }
}  

exports.refresh=async(req,res)=>{
    try {
        //why are we taking refresh token from the body it should be in header ?
        const tokens=await authService.refresh(req.body.refreshToken);
        res.json(tokens);

    } catch (e) {
        res.status(401).json({message:e.message});        
    }
}

exports.logout=async (req,res) => {
    try {
        //why are we taking refresh token from the body it should be in header ?
        await authService.logout(req.body.refreshToken);
        res.json({message:"logged out"})   
    } catch (e) {
        res.status(401).json({message:e.message});
    }
}

