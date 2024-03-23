const express=require('express');
const { register, newUser, loginUser, loginNew, authCheck, dashboard, logout } = require('../Controller/userController');
const Router=express.Router();
const userAuth=require('../Middleware/userAuth')

Router.get('/',register);
Router.post('/register',newUser);
Router.get('/login',loginUser);
Router.post('/login/create',loginNew);
Router.get('/dashboard',[userAuth.jwtAuth],authCheck,dashboard);
Router.get('/logout',[userAuth.jwtAuth],authCheck,logout)



module.exports=Router