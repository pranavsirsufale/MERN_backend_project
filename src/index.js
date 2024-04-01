// require('dotenv').config()
import dotenv from 'dotenv'
import connectDB  from './db/index.js'
import {app} from './app.js'

dotenv.config({
    path:'./env'
})

//! this is one of the approach connecting database ;😎🤩👀
/*
import express from 'express'
const app = express()
(async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("EROR : " , error)
        throw error
    })

    app.listen(process.env.PORT,()=>{
        console.log(`App is listening port ${process.env.PORT}`);
    })

    } catch (error) {
        console.error("ERROR : " , error);
        throw error
    }
})()
*/



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`SERVER IS RUNNING AT POIRT :  ${process.env.PORT}`);
    })
})
.catch((e)=>{
    console.log('MONGO DB CONNECTION FAILED REASON !!!' , e);
})



