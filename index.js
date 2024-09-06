const express=require('express')
const mongoose=require("mongoose")
const dotenv=require('dotenv')
const vendorRoutes=require('./Routes/VendorRoutes')
const bodyparser=require('body-parser')
const firmRoutes=require("./Routes/FirmRoutes")
const productRoutes=require('./Routes/ProductRoutes')
const path=require('path')

const app=express();
dotenv.config();
 const PORT=process.env.PORT||3000
 app.listen(PORT,()=>{
    console.log(`port is runnning succesfully at ${PORT}`)
 })


app.use(bodyparser.json());
app.use('/vendor',vendorRoutes)

app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))

 mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    console.log("mongodb connected succesfully")
 })
 .catch((error)=>{

    console.log("mongodb not coonected",error)
 })

 app.use('/',(req,res)=>{
    res.send("<h1>Welcome To Appy Backend</h1>")
 })