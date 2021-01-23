const router = require('express').Router()
const {userRegistered,userlogin} = require('../utils/Auth');

//registration user route
router.post('/register-user',async(req,res)=>{
    await userRegistered(req.body,"user",res);
});
//registration admin route
router.post('/register-tailor',async(req,res)=>{
    await userRegistered(req.body,"tailor",res);
});
//registration superAdmin route
router.post('/register-superadmin',async(req,res)=>{
    await userRegistered(req.body,"superadmin",res);
});
//login user route
router.post('/login-user',async(req,res)=>{
    await userlogin(req.body,"user",res);
});
//login admin route
router.post('/login-tailor',async(req,res)=>{
    await userlogin(req.body,"tailor",res);
});
//login superAdmin route
router.post('/login-superadmin',async(req,res)=>{
    await userlogin(req.body,"superadmin",res);
});
//profileuser route
router.get( '/profile-user',async()=>{});
//protected user route
router.post('/protected-user',async()=>{});
//protected admin route
router.post('/protected-admin',async()=>{});
//protected superAdmin route
router.post('/protected-superadmin',async()=>{});

module.exports = router;