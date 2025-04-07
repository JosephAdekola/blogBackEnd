const express = require("express")
const mongoose = require("mongoose")
const router = require("../router/route")
const dovenv = require("dotenv").config()
const cors = require("cors")

const app = express()
app.use(cors("http://localhost:5173"))

app.use(express.json())
app.use(router)

app.get("/", (request, response)=>{
    response.send('welcome to homepage')
})

mongoose.connect(process.env.MongoDBURL).then(
    app.listen(3500, ()=>{
        console.log('DB connected successfully');
        console.log('server now running on port 3500');
        
    })
).catch((error)=>{
    console.log(error);
    
})

