const express    = require('express')
const router     = express.Router()
const mongoose   = require('mongoose')
const bcrypt     = require('bcrypt')
const User       = require('../models/user')
const jwt        = require("jsonwebtoken")
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

router.post('/login',(req,res,next)=>{
    User.find({email: req.body.email}).then((user)=>{
        if(user.length<1){
            return res.status(404).json({
                message: "invalid email"
            })
        }

        bcrypt.compare(req.body.password,user[0].password,(err,re)=>{
            if(err){
                return re.status(404).json({
                    message: "Authentinvalid password"
                })
            }
            if(re){
                const token = jwt.sign({
                        email:user[0].email,
                        userId: user[0]._id,
                        },
                        process.env.JWT_KEY,
                        {
                            // expiresIn: "1"
                        }
                    )
                return res.status(200).json({
                    message: "Auth successfull",
                    token : token
                })
            }
            res.status(401).json({
                message : "auth failed"
            })
        })
    }).catch((e)=>{
        res.status(500).json({error:e})
    })
})
router.get('/',(req,res,next)=>{
    User.find().then((results)=>{
        res.status(200).json(results)
    }).catch((e)=>{
        res.status(500).json({error:e})
    })
})

router.delete('/:userId',(req,res,next)=>{
    User.findByIdAndRemove(req.params.userId).then((results)=>{
        res.status(200).json(results)
    }).catch((e)=>{
        res.status(500).json({error:e})
    })
})

module.exports = router