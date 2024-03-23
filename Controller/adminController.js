const { comparePassword } = require("../Middleware/Auth");
const UserModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");

//login view
const LoginView = (req, res) => {
  res.render("Admin/adminLogin", {
    
  });
};

//admin login
const AdminLogin = async (req, res) => {
  try {
    const data = await UserModel.findOne({
    email: req.body.email
    })
    if (data) {
        if (data.role == "ADMIN") {
            const password=req.body.password
            if (comparePassword(password, data.password)){
                const token = jwt.sign({
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    
                }, "souvikjash1234", { expiresIn: "1d" });
                res.cookie('adminToken', token)
                res.redirect('/admin/dashboard');
                //console.log(data);
            } else {
               console.log('error');
                res.redirect('/admin/login')
            }
        } else {
            console.log('hghhf');
            res.redirect('/admin/login')
        }
    }

} catch (error) {
    console.log(error);
}
};

const AdminDashboard = (req, res) => {
  console.log(req.admin);
  res.render("Admin/adminDashboard", {
    data: req.admin,
  });
};

const adminAuthCheck = (req, res, next) => {
  if (req.admin) {
      //console.log(req.admin);
      next()
  } else {
      res.redirect("/admin/login");
  }
}
//logout
const Logout = (req, res) => {
  res.clearCookie('adminToken')
  res.redirect('/admin/login')
}


module.exports = {
  LoginView,
  AdminLogin,
  AdminDashboard,
  adminAuthCheck,
  Logout
};
