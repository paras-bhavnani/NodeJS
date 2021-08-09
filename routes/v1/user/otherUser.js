const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const user = require('../../../services/users')

module.exports = () => {
    return (req, res) => {
        const userId = req.params.userId
        console.log('reuestData: ', userId)
        console.log("Type of ",typeof(user.otherInfo))
        const otherUserDetails = user.otherInfo(userId)
        if (otherUserDetails['status']){
            res.status(200).json({
                success: true,
                message: otherUserDetails['val']
            })
        }else{
            res.status(401).json({
                success: false,
                message: otherUserDetails['val']
            })
        }
    }
}