const express = require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Get req for /orders"
    })
})
router.post('/',(req,res,next)=>{
    res.status(200).json({
        message: "POST req for /orders"
    })
})
router.get('/:orderId',(req,res,next)=>{
    const id = req.params.orderId

    if(id === 2){
        res.status(200).json({
            message: "Get req for order id",
            id: id
        })
    }else{
        res.status(200).json({
            message: "can not find the order id"
         })
    }
})
router.patch('/:orderId',(req,res,next)=>{
    const id = req.params.orderId

    if(id === 2){
        res.status(200).json({
            message: "patch/update req for order id",
            id: id
        })
    }else{
        res.status(200).json({
            message: "can not find the order id for update"
         })
    }
})
router.delete('/:orderId',(req,res,next)=>{
    const id = req.params.orderId

    if(id === 2){
        res.status(200).json({
            message: "delete req for order id",
            id: id
        })
    }else{
        res.status(200).json({
            message: "can not find the order id for delete"
         })
    }
})

module.exports = router;