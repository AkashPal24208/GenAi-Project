const jwt = require('jsonwebtoken');
const tokenBlackListModel = require('../models/blacklist.model');


 async function authUser(req,res,next){ 

    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Token not provided."
        })
    }
      // check token is blacklisted or not 
     const isTokenBlacklisted  = await tokenBlackListModel.findOne({
        token
     })

     if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Token is blacklisted.please login again."
        })
     }  
 
    // after getting token we have to verify it 
    try{
     const decoded =jwt.verify(token, process.env.JWT_SECRET_KEY);
     req.user = decoded
     next();

    }catch(err){
      return res.status(401).json({
        message:"Inavlid token."
      })
    }

}

module.exports = {authUser}