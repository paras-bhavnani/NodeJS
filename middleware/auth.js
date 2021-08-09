const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof(bearerHeader) !== 'undefined'){
        const token = bearerHeader.split(' ')[1]
        jwt.verify(token, process.env.SECRET, (err, authData) => {
            if (err){
                res.status(403).json({
                    status: 'fail',
                    message: 'Token not found'
                })
            }else{
                console.log('Successful Authorization!!')
                console.log(authData)
                next()
            }
        })
    }else{
        res.status(403).json({
            status: 'fail',
            message: 'Token not found'
        })
    }
}

const authProfile = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof(bearerHeader) !== 'undefined'){
        const token = bearerHeader.split(' ')[1]
        jwt.verify(token, process.env.SECRET, (err, authData) => {
            if (err){
                res.status(403).json({
                    status: 'fail',
                    message: 'Token not found'
                })
            }else{
                console.log('Successful Authorization!!')
                console.log(authData)
                req.body = {id: authData.id}
                next()
            }
        })
    }else{
        res.status(403).json({
            status: 'fail',
            message: 'Token not found'
        })
    }
}

module.exports = {
    auth,
    authProfile
}