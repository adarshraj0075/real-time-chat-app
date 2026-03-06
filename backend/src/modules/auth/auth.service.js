const bcrypt=require("bcrypt");
const User=require("../user/user.model");
const Session=require("./session.model");
const {signAccessToken,signRefreshToken}=require("../../utils/jwt");

exports.signUp=async({name,email,password})=>{
    const exists=await User.findOne({email});
    if(exists)throw new Error("Email already exists");

    const hash=await bcrypt.hash(password,10);

    const user=await User.create({
        name,
        email,
        password:hash
    })

    return user;
};

exports.login=async({email,password,userAgent,ip})=>{
    const user=await User.findOne({email});
    if(!user)throw new Error("Invalid Credential");

    const ok=await bcrypt.compare(password,user.password);
    if(!ok)throw new Error("Invalid Credential"); 

    const session=await Session.create({
        userId:user._id,
        userAgent,
        ip,
        expiresAt:new Date(Date.now()+7*24*60*60*1000)
    })

    const accessToken=signAccessToken(user._id);
    const refreshToken=signRefreshToken(session._id);
    session.refreshToken=refreshToken;
    await session.save();

    return {user,accessToken,refreshToken};

};

//why are we sending new refresh and acess token by doing this are we not give the user liftime access of the site ?

exports.refresh=async (refreshToken)=>{
    //i have imported these above do i need to import these every time
    const {verifyRefreshToken}=require("../../utils/jwt");

    const payload=verifyRefreshToken(refreshToken);
    const session=await Session.findById(payload.sid);
    if(!session) throw new Error("Session not found");

    if(session.refreshToken!==refreshToken){
        throw new Error("Token mismatch");
    }

    const newAccess=signAccessToken(session.userId);
    const newRefresh=signRefreshToken(session._id);

    session.refresh=newRefresh;
    await session.save();

    return {accessToken:newAccess,refreshToken:newRefresh}
}

exports.logout=async(refreshToken)=>{
    //i have imported these above do i need to import these every time
    const {verifyRefreshToken,signAccessToken,signRefreshToken}=require("../../utils/jwt");
    const payload=verifyRefreshToken(refreshToken);

    //how deleting refreshtoken from Session will logout the user?
    await Session.findByIdAndDelete(payload.sid);
    return {message:"user logout"};
}