const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const routes = require('express').Router()
module.exports = () => {
    routes.use('/user', require('./user')())
    return routes
}