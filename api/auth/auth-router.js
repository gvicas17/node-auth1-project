const express = require('express')
const User = require('../users/users-model')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.post('/register', (req, res) => {
    const {username, password} = req.body
    const hash = bcrypt.hashSync(password, 10)

    User.add({username, password: hash, role: 2})
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
})

router.post('/login', async (req, res) => {
   const {username, password} = req.body

   try{
       const userInfo = await User.findBy({username}).first()

       if(userInfo && bcrypt.compareSync(password, userInfo.password)){
           req.session.user = userInfo
           res.json('welcome back')
       }else{
           res.status(401).json('invalid credentails')
       }
   }catch(err){
       res.status(500).json(err.message)
   }
})
   
   router.get('/logout', (req, res) => {
       if(req.session && req.session.user){
           req.session.destroy(err => {
               if(err){
                   res.json('you cannot leave')
               }else{
                   res.json('goodbye')
               }
           })
       }else{
           res.end()
       }
   })

module.exports = router