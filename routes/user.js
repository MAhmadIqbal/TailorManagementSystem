    
    const express = require('express');
    const router = express.Router();
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    
    const userController= require('../controllers/user');
    const checkAuth = require('../middlewares/checkAuth');
    
    router.post('/signup/test', (req)=>{
        console.log(req.body);
    });
    router.post('/signup', userController.usersSignUp);
    router.post("/login", userController.usersLogin);
        
    router.delete('/:userId',checkAuth, userController.userDelete);
    router.get('/',userController.userAll);
    router.post('/request-reset-password',(req,res)=>{
        userController.requestResetPassword
    });
    router.post('/reset-password',userController.resetPassword);

    module.exports = router;