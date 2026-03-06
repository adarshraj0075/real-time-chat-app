const jwt=require("jsonwebtoken")

exports.signAccessToken=(userId)=>{
    return jwt.sign(
        {sub:userId},
        process.env. JWT_ACCESS_SECRET,
        {expiresIn:"15m"}
    );
};

exports.signRefreshToken=(sessionId)=>{
    return jwt.sign(
        {sid:sessionId},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn:"7d"}
    )
}

exports.verifyAccessToken=(token)=>{
    return jwt.verify(token,process.env.JWT_ACCESS_SECRET)
}

exports.verifyRefreshToken=(token)=>{
    return jwt.verify(token,process.env.JWT_ACCESS_SECRET)
}