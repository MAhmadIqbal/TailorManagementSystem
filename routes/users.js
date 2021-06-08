    
    const express = require('express');
    const router = express.Router();
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    
    const userController= require('../controllers/user');
    const checkAuth = require('../middlewares/checkAuth');
    //----------------SignUp AND LogIn routes here----------
    router.post("/login", userController.usersLogin);
    router.post('/signup', userController.usersSignUp);
    //----------------User delete routes here------------
    router.delete('/:userId',checkAuth, userController.userDelete);
    router.get('/',userController.userAll);
    //---------------User forget password recovery routes here----------
    router.post('/request-reset-password',userController.resetPasswordRequest);
    router.post('/reset-password',userController.resetPassword);
    //-----------------User logout route  here------- 
    router.get('/logout',userController.logout);
    //---------------notifications routes here-----------
    
    // router.get('/sendtoAll',userController.notifications);
    // router.get('/sendtoUser/:id',userController.notificationtoUser)
    
    router.post('/sendemail',userController.sendMail);
    //---------------------------------------------------------------

    module.exports = router;