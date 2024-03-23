const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cookiepurser = require("cookie-parser");
const app = express();

app.use(cookiepurser());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("Views", "Views");

const uiRouter = require("./Router/uiRouter");
app.use(uiRouter);

//admin middleware
// const adminMiddleware = require('./Middleware/AdminAuth')
// app.use(adminMiddleware.jwtAuth)

//admin router
const AdminRouter=require('./Router/adminRoute');
app.use('/admin',AdminRouter)

const auth = require("./Middleware/userAuth");
app.use(auth.jwtAuth)

const PORT = 5050;
const dbDriver =
  "mongodb+srv://souvickjash9836:hahMNOgVnI9ioYbh@cluster0.3kynmom.mongodb.net/HOME";
  mongoose.connect(dbDriver, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`server running port : http://localhost:${PORT}`);
      console.log(`Database connected successfully`);
    });
  })
  .catch((error) => {
    console.log(error);
  });