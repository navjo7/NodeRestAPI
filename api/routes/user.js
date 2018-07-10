const express    = require('express')
const router     = express.Router()
const mongoose   = require('mongoose')
const bcrypt     = require('bcrypt')
const User       = require('../models/user')
const salt = 10
router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,salt,(err,hash)=>{
        if(err){
            console.log(err)
            return res.status(500).json({error:err})
        }else{
            const user = new User({
                _id : new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            })
            user.save().then((result)=>{
                res.status(200).json({
                    message: "signup successful"
                })
            }).catch((e)=>{
                    res.status(500).json({
                    message: "signup unsuccessfull",
                    error: e
                })
            })
        }
    })
})



module.exports = router