const express = require("express");
const {
  AdminLogin,
  AdminDashboard,
  LoginView,
  adminAuthCheck,
  Logout,
} = require("../Controller/adminController");
const { jwtAuth } = require("../Middleware/AdminAuth");
const Router = express.Router();

Router.get("/login", LoginView);
Router.post("/create/login", AdminLogin);
Router.get("/dashboard", jwtAuth,adminAuthCheck, AdminDashboard);
Router.get("/logout", jwtAuth,adminAuthCheck,Logout);


module.exports = Router;
