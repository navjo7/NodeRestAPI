const express = require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Get req for /products"
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message: "Get POST for /products"
    })
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId
    if(id === '1'){
        res.status(200).json({
            message: "Get for product id",
            id: id
        })
    }else{
        res.status(200).json({
            message: "can not find the product id"
        })
    }
})
router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message: "patch request for products with id: "+req.params.productId
    })
})

router.delete('/:productId',(req,res,next)=>{
    res.status(200).json({
        message: "delete request for products with id: "+req.params.productId
    })
})

module.exports = router
