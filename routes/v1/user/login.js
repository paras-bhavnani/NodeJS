require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const user = require('../../../services/users')

module.exports = () => {
    return (req, res) => {
        const requestData = req.body
        //console.log('reuestData: ',requestData)
        const email = requestData.email
        const password = requestData.password
        const loginDetails = user.userLogin(email, password)
        if (loginDetails['status']){
            const token = jwt.sign({id: loginDetails['val'].id , email: loginDetails['val'].email, name: loginDetails['val'].name, mobile: loginDetails['val'].mobile}, process.env.SECRET)
            res.status(200).json({
                success: true,
                message: loginDetails['val'],
                token: token
            })
        }else{
            res.status(401).json({
                success: false,
                message: loginDetails['val']
            })
        }
    }
}