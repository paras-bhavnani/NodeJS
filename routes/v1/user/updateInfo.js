const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const user = require('../../../services/users');

module.exports = () => {
    return (req, res) => {
        const bearerHeader = req.headers['authorization']
        const token = bearerHeader.split(' ')[1]
        currentUser = jwt.verify(token, process.env.SECRET)
        const profile = req.body
        console.log("currentUserID ", currentUser.id)
        newUserData = user.updateUserInfo(currentUser.id, profile.name, profile.email, profile.mobile);
        if (newUserData.status === true){
            res.status(200).json({
                success: true,
                profile: newUserData.user
            })
        }else{
            res.status(403).json({
                success: false,
                profile: newUserData.message
            })
        }
    }
}