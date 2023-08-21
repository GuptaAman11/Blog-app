const express = require('express')
const {connection} = require('./db')
const userRoutes=require('./routes/user.routes')
const app = express()


app.listen(4000,()=>{
    console.log("server started")
})

connection();
app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use('/api/v1/user',userRoutes);