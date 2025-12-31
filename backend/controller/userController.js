const dbConnection = require("../config/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

async function register(req, res) {
  const{username, firstname,lastname,email,password} =req.body;
  if(!email||!password|| !firstname || !lastname || !username){
    return res.status(400).json({msg: "please provide all required fields"})
  }
  try{
    const [user] =await dbConnection.query("select username,userid from users where username = ? or email =?",[username,email])
    if(user.length>0){
      return res.status(400).json({msg: "user already existed"})
    }
    if(password.length<=8){
     return res.status(400).json({msg:"password must be at least 8 character"})
    }
    //encrypt the password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt)
    await dbConnection.query("INSERT INTO users (usrname,lastname,email,password) VALUES (?,?,?,?,?",[username,firstname,lastname,email,hashedpassword])

    return res.status(StatusCodes.CREATED).json({msg:"something went wrong,try again later!"})
  }  catch (error){
       console.log(error.message)
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"somthing went wrong"})
  }
  res.send("register logic");
}

async function login(req, res) {
  // Student 2 will implement login logic here
  res.send("login logic");
}

async function checkUser(req, res) {
  // This uses the authMiddleware to verify the user
  const { username, userid } = req.user;
  res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = { register, login, checkUser };
