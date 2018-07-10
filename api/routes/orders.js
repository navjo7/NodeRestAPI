const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Order  = require('../models/order')
const Product  = require('../models/product')

router.get('/',(req,res,next)=>{
    Order.find().select('product _id quantity').then((docs)=>{
        res.status(200).json(docs)
    }).catch((e)=>{
        res.status(500).json(e)

    })
})
router.post('/',(req,res,next)=>{
    Product.findById(req.body.productId).then((product)=>{
        console.log(product)
        if(!product){
            return res.status(404).json({
                message: "product id not found"
            })
        }
        const order = new Order({       
            _id : new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        })
        return order.save()
    }).then((result)=>{
            res.status(201).json(result)
    }).catch((e)=>{
        res.status(500).json(e)
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