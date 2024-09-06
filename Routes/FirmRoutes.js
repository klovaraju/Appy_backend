const express=require('express')
const firmcontroller=require('../Controllers/FirmControllers')
const verifyToken=require("../middlewares/verifyToken")

const router=express.Router()

router.post('/add-firm',verifyToken,firmcontroller.addFirm)

router.get('/:firmId',firmcontroller.deleteFirmById)
router.delete('/:firmId',firmcontroller.deleteFirmById)


router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
})
module.exports=router;
