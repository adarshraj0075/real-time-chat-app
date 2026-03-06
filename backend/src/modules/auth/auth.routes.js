const router=require("express").Router();
const ctrl=require("./auth.controller");
const validate=require("../../middleware/validate");
const {signUpSchema,loginSchema}=require("./auth.validation");

//why login route is not protected by auth middle ware?
router.post("/signup",validate(signUpSchema),ctrl.signup);
router.post("/login",validate(loginSchema),ctrl.login);
router.post("/refresh",ctrl.refresh);
router.post("/logout",ctrl.logout);

module.exports=router;