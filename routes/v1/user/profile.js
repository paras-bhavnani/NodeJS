const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const users = require('../../../services/users');

module.exports = () => {
    return (req, res) => {
        id = req.body.id;
        //console.log("Profile id is ", id);
        const profile = users.profileInfo(id);
        res.status(200).json({
            success: true,
            profile: profile
        })
    }
}