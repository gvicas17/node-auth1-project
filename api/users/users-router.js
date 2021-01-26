const router = require('express').Router()
const Users = require('./users-model')
const protected = require('../auth/auth-middleware')

router.get('/', protected, (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router