const express=require("express")

const productControllers = require("../Controllers/ProductControllers");

const router=express.Router();

router.post('/add-product/:firmId',productControllers.addProduct)
router.get('/:firmId/products',productControllers.getProductsByFirm)
router.delete('/:productId',productControllers.deleteProductById)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
})
module.exports=router;