const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const dotenv=require('dotenv');


dotenv.config();

const secretKey=process.env.whatIsYourName;
const vendorRegister=async(req,res)=>{
    const {username,email,password}=req.body
    try{

        const vendorEmail=await Vendor.findOne({email})
        if(vendorEmail){
            return res.status(400).json("Email already Registered")
        }
        const hashedPassword=await bcrypt.hash(password,10);

    const newVendor=new Vendor({
        username,email,password:hashedPassword
    });
    await newVendor.save()
    res.status(201).json({message:"vendor registered successfully"})
    
    console.log("registered")
   
    }catch(error){
   console.log(error)
        res.status(500).json({message:"internal message error"})

    }

}

const vendorLogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
  const vendor=await Vendor.findOne({email});
   if(!vendor||!(await bcrypt.compare(password,vendor.password))){
    return res.status(401).json({message:"invalid username or password "})
    
   }
   
   const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})
   res.status(200).json({message:"login successfully",token});
     console.log(email,token)
    

 
     

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"internal server error"})

    }
}


const getAllVendors=async(req,res)=>{
    try {
        const vendors=await Vendor.find().populate('firm');
        res.json({vendors})
    } catch (error) {
        
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

const getVendorById=async(req,res)=>{

    const vendorId=req.params.id;
    try {
        const vendor=await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(404).json({message:"vendor not found"})
        }
        res.status(200).json({vendor})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}






module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}