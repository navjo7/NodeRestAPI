const express       = require('express')
const app           = express()
const morgan        = require('morgan')
const bodyParser    = require('body-parser')
const cors          = require('cors')
const mongoose      = require('mongoose')
const helmet        = require('helmet')


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(helmet());


//cors implementation

// app.use(cors({origin:true, credentials: true}))
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers','*')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, GET, PATCH, DELETE, POST')
        return res.status(200).json({})
    }
    next();
})

//routes which handle requests
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
// ,{ 
//     useNewUrlParser: true,
    
// }
const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

const encodedPassword = encodeURIComponent(process.env.DB_PASS);
const dbURI = 'mongodb://' + process.env.DB_USER + ':' + encodedPassword + process.env.DB_URI_1 + process.env.DB_Name + process.env.DB_URI_2

mongoose.connect(dbURI).then(()=>{
    console.log(" DB connected successfully")
}).catch((e)=>{
    console.log(e)
})

mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use('/products',productRoutes)
app.use('/orders', orderRoutes)

app.use((req,res,next)=>{
        const error = new Error("not found")
        error.status = 404;
        next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        error:{
            message: error.message
        }
    })
})


module.exports = app;