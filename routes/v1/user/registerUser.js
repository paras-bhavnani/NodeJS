const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const userRegister = require('../../../services/users')
const bcryptjs = require('bcryptjs')


app.use('/uploads', express.static('uploads'));

module.exports = () => {
    return (req, res) => {
        const requestData = req.body
        console.log('requestData: ',requestData)
        const name = requestData.name
        const email = requestData.email
        const mobile = requestData.mobile
        const password = requestData.password
        const hashedPassword = bcryptjs.hashSync(password, 10);
        console.log("Hashed Password",hashedPassword);
        const profilePic = req.file.path
        console.log("Profile Pic ",profilePic);
        userDetails = userRegister.userRegistration(name, email, mobile, hashedPassword,profilePic)
        res.status(200).json({
            success: true,
            message: "Inserted successfully User name: " + userDetails['name'],
            password: userDetails['password']
        })
    }
}