const express = require('express')
const routes = require('express').Router()
require('dotenv').config()
const app = express()
const port = process.env.PORT || 8080
const routesController = require('./routes/v1')()
//const bodyParser = require('body-parser')

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/v1', routesController)

//app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.post('/', (req, res) => {
    console.log(req.body)
    res.status(200).json({message: "Hello!"}) 
})

app.listen(port, () => {
    console.log('Server has started and is is running on port: ',port)
})