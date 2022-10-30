const express = require('express')
const app = express()
const dotenv = require('dotenv')
const router =require('./router/router')
const cors = require('cors')

//Import the mongoose module

dotenv.config({
    path:'./config/config.env'
})

var mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

//connecting to database  
//demoDB is the name of database  
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})  
.then(()=>console.log('connected to database')).catch(error=>console.log('error occured',error))


app.use(cors())


app.use(cookieParser())
app.use(express.json())
app.use(router)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})