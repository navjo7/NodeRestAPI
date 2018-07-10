const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Order  = require('../models/order')

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Get req for /orders"
    })
})
router.post('/',(req,res,next)=>{

    const order = new Order({
        _id : new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
    })
   order.save().then((result)=>{
        console.log(results)
    }).catch((e)=>{
        console.log(e)
    })
    res.status(200).json({
        message: "POST req for /orders",
        order: order
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