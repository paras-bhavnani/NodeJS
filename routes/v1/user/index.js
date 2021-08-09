const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const authJWT = require('../../../middleware/auth')

const routes = require('express').Router()

const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

module.exports = () => {
    routes.post('/registerUser',upload.single('profilePic') ,require('./registerUser')()),
    routes.post('/login', require('./login')()),
    routes.get('/otherUser/:userId',authJWT.auth, require('./otherUser')())
    routes.post('/profile',authJWT.authProfile, require('./profile')())
    routes.post('/updateInfo',authJWT.auth, require('./updateInfo')())
    routes.post('/changePassword',authJWT.auth, require('./changePassword')())
    return routes
}