
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const tokenBlackListModel = require('../models/blacklist.model') 
const { oauth2Client } = require("../utils/googleConfig");

/**
 * @name registerUserController
 * @description register a new user,expect username,email and password
 * @access Public
 */

async function registerUserController(req,res){
    const {username, email, password} = req.body
   
    if( !username || !email || ! password){
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
     name:username,
    username,
    email,
    password:hash
   }) 
  
   // create token 
   const token  = jwt.sign(
    {id: user._id, username: user.username },
    process.env.JWT_SECRET_KEY,
    {expiresIn: "1d"}
   )

   // set token into cookies 
   res.cookie("token",token,{
    httpOnly:true,
    secure:true,
    sameSite:"none",
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
    process.env.JWT_SECRET_KEY,
    {expiresIn: "1d"}
   )

   // set token to cookie
   res.cookie("token",token,{
    httpOnly:true,
    secure:true,
    sameSite:"none",
    maxAge: 24*60*60*1000
   })


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
    try{
     const user = await userModel.findById(req.user.id)
     if(!user){
        return res.status(404).json({
            message:"User does not found:"
        })
     }
     res.status(200).json({
    message:"user details fetched successfully",
    user:{
        id:user._id,
        username: user.username,
        email: user.email
    }
   })
    }catch(err){
     console.log("Error while fecthing user:",err);
     return res.status(500).json({
        message:"Internal server error:"
     })
    }

}


/**
 * @googleLoginController 
 * @route POST /api/auth/google/callback
 */

async function googleLoginController(req,res){
      
      try{
    const { code } = req.body;
  
      if(!code){
          return res.status(400).json({
               message:'Authorization code is missing',
          });
      }

     //  1. exchange authorization code for tokens 
    
      const {tokens} = await oauth2Client.getToken(code);

      if(!tokens.id_token){ // id_token is a property of token 
        return res.status(401).json({
          message:"Google Id token is missing",
        });
      }       

      // 2. Verify Google's  ID token 
       const ticket = await oauth2Client.verifyIdToken({
          idToken: tokens.id_token,
          audience: process.env.GOOGLE_CLIENT_ID,
       });

       const payload = ticket.getPayload();

       if(!payload || !payload.sub || !payload.email){
           return res.status(401).json({
               message:'Invalid Goggle account information',
           });
       }
      
       const { sub: googleId, email, name, email_verified } = payload;

       if(!email_verified){
           return res.status(403).json({
                message:'Please use a verified Google account',
           });
       }
    
     //   3. find or create user 
     let user = await userModel.findOne({googleId});

     if(!user){
          // avoid duplicate account for an existing email
          user  = await userModel.findOne({email:email.toLocaleLowerCase()});
           
         if(user){
          // link account only through verified account,do not automatically link account by email.
          return res.status(409).json({
               message:'An account with this email already exist',
          });
         } 

         user = await userModel.create({
          googleId,
          name,
          email: email.toLocaleLowerCase(),
         });
     }

         // 4. Generate your application's JWT 
         const token = jwt.sign(
           {id:user._id},
           process.env.JWT_SECRET_KEY,
           {expiresIn:process.env.JWT_TIMEOUT || '1d'}
         );
        
     //     5. set HttpOnly cookie 
      res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
      }) 
    
     //  6.send user information to frontend
      return res.status(200).json({
          message:'Google Login successfull',
         user:{
            id: user._id,
            username: user.username,
            email: user.email
    },
      });
     
      }
      catch(err){
            
            console.error('Google OAuth error:', err.response?.data || err.message || err);

             return res.status(500).json({
               message:'Google authentication failed',
               error:err.message,
             })
      }
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
    googleLoginController
}