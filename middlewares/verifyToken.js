const Vendor=require('../models/Vendor')
const jwt=require('jsonwebtoken');
const dotenv=require("dotenv");

dotenv.config();
const secretkey=process.env.whatIsYourName;
const verifyToken=async(req,res,next)=>{

    const token=req.headers.token;

    if(!token){
        return res.status(401).json({message:"token is required"})
    }
    try {
        const decoded=jwt.verify(token,secretkey)

        const vendor=await Vendor.findById(decoded.vendorId);
        if(!vendor){
            return res.status(404).json({message:"vendor not found"});
        }
        req.vendorId=vendor._id

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"invalid token"})
    }
}

module.exports=verifyToken;
