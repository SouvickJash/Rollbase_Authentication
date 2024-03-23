const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs')

const hashPassword = async (password) => {
   try {
     const saltPassword = 10;
     const hashPassword = await bcrypt.hash(password, saltPassword);
     return hashPassword;
   } catch (error) {
     console.log(error);
   }
 };
//token
const createToken = async (id) => {
   try {
     const token = await jwt.sign({ _id: id }, "souvikjash1234", {
       expiresIn: "12h",
     });
     return token;
   } catch (error) {
     res.status(500).send(error.message);
     console.log(error);
   }
 };
 
//comapre password
const comparePassword = async (password, hashPassword) => {
   return bcrypt.compare(password, hashPassword);
 };


 module.exports={
   hashPassword,
   createToken,
   comparePassword
 }