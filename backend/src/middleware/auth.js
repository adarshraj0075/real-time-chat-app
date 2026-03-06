const{verifyAccessToken}=require("../utils/jwt");

module.exports=(req,res,next)=>{
    try {
        const header=req.headers.authorization;
        if(!header || !header.startsWith("Bearer ")){
            return res.status(401).json({message:"no token"});
        }
        
        //logic behind this
        const token=header.split(" ")[1];
        const payload=verifyAccessToken(token);
        req.userId=payload.sub;
        next()
    } catch (e) {
        res.status(401).json({message:"no token"});
    }
}