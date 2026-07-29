
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const tokenBlackListModel = require('../models/blacklist.model') 

/**
 * @name registerUserController
 * @description register a new user,expect username,email and password
 * @access Public
 */

async function registerUserController(req,res){
    const {username, email, password} = req.body
   
    if(!username || !email || ! password){
        return res.status(400).json({
            message:"Please provide username, email and password "
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ {username} , {email} ]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"Account already exist with this email address or username"
        })
    }
   // hash password 
   const hash  = await bcrypt.hash(password,10)

   const user = await userModel.create({
    username,
    email,
    password:hash
   }) 
  
   // create token 
   const token  = jwt.sign(
    {id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
   )

   // set token into cookies 
   res.cookie("token",token,{
    httpOnly:true,
    secure:false,
    sameSite:"lax",
    maxAge: 24*60*60*1000
   })

   // create resource 
   res.status(201).json({
    message:"User registered succesfully",
    user:{
        id: user._id,
        username: user.username,
        email: user.email
    }
   })
  


 }

/**
  * @name loginUserController
  * @description login a user, expects email and password in the request body
  * @access Public
  */

 // creating login controller 
async function loginUserController(req,res){
   
    const {email, password} = req.body

    const user = await userModel.findOne({email})
 // check whether user exist or not 
    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    // check for password 
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
   // created token 

    const token  = jwt.sign(
    {id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
   )

   // set token to cookie
   res.cookie("token",token)
   res.status(200).json({
    message: "User loggedIn succesfully",
    user: {
        id:user._id,
        username: user.username,
        email:user.email
    }
   })
   
}
 
// creating another api for logout 
/**
 * @name logoutUserController
 * @description clear token from user cookie and add token in the blacklist
 * @access public
 */

async function logoutUserController(req,res){
    const token  = req.cookies.token

    if(token){
        await tokenBlackListModel.create({ token })
    }
    // clear cookie 
    res.clearCookie("token")

    res.status(200).json({
        message: "User loggedout succesfully"
    }) 
}
 
/**
 * 
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req,res){

   const user = await userModel.findById(req.user.id)

   res.status(200).json({
    message:"user details fetched successfully",
    user:{
        id:user._id,
        username: user.username,
        email: user.email
    }
   })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}