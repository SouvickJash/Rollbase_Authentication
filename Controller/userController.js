const userModel = require("../Model/userModel");
const bcriypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  res.render("register", {
    title: "register",
  });
};
//new register
const newUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const user = new userModel({
      name,
      email,
      phone,
      password: bcriypt.hashSync(req.body.password, bcriypt.genSaltSync(10)),
    });
    const result = await user.save();
    if (result) {
      res.redirect("/login");
    } else {
      console.log("user not added");
    }
  } catch (error) {
    console.log(error);
  }
};

//login view
const loginUser = (req, res) => {
  res.render("login", {
    title: "login",
  });
};
//login
const loginNew = async (req, res) => {
  try {
    const data = await userModel.findOne({
      email: req.body.email,
    });
    if (data) {
      const pwd = data.password;
      if (bcriypt.compareSync(req.body.password, pwd)) {
        const token = jwt.sign(
          {
            id: data._id,
            name: data.name,
            phone: data.phone,
            email: data.email,
          },
          "webskitters12345",
          { expiresIn: "10m" }
        );
        res.cookie("userToken", token);
        res.redirect("/dashboard");
      } else {
        console.log("password noot match");
        res.redirect("/login");
      }
    }
  } catch (error) {
    console.log(error);
  }
};
//dashboard view
const dashboard = (req, res) => {
  res.render("dashboard", {
    title: "dashboard",
    data: req.user,
  });
};
const authCheck = (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    next();
  } else {
    console.log("error");
    res.redirect("/login");
  }
};
//logout
const logout = (req, res) => {
  res.clearCookie("userToken");
  res.redirect("/login");
};

module.exports = {
  register,
  newUser,
  loginUser,
  loginNew,
  dashboard,
  authCheck,
  logout,
};
