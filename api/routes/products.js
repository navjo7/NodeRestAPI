const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product')

router.get('/',(req,res,next)=>{
    Product.find().then((doc)=>{
        if (!doc) {
            res.status(404).json({
                message: "no data available"
            })
        }
        console.log(res)
        res.status(200).json(doc)
    }).catch((e) => {
        // console.log(e)
        res.status(500).json({
            error: e
        })

    })
})

router.post('/',(req,res,next)=>{
   
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then((result)=>{
        console.log(result)
         res.status(201).json({
             message: "Get POST for /products",
             createdProduct: product
         })
    }).catch((e)=>{
        console.log(e)
         res.status(500).json({
             message: "Error in Get POST for /products",
             error: e
         })
    })

   
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId
    Product.findById(id).then((doc)=>{
        if(!doc){
            res.status(404).json({
                message: "no data available"
            })
        }
        console.log(res)
        res.status(200).json(doc)
    }).catch((e)=>{
        // console.log(e)
        res.status(500).json({error:e})

    })
})
router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId
    const updateOps = {}

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Product.findByIdAndUpdate(id,{$set:updateOps},{new:true}).then((result)=>{
        res.status(200).json(result)
    }).catch((e)=>{
        res.status(500).json(e)
    })
})

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId
    Product.findByIdAndRemove(id).then((result)=>{
        res.status(200).json(result)
    }).catch((e)=>{
        res.status(500).json(e)
    })
    
})

module.exports = router
