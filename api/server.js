const express = require('express')

const server = express()
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)


server.use(express.json())
server.use(session({
    name: "monkey", 
    secret: "keep it secret, keep it safe!", 
    cookie: {
      maxAge: 1000 * 60 * 60, 
      secure: false, 
      httpOnly: true, 
    },
    resave: false, 
    saveUninitialized: false, 
  
    // store: new KnexSessionStore({
    //   knex: require('../database/db-config'), 
    //   tablename: 'sessions', 
    //   sidfieldname: 'sid', 
    //   createtable: true, 
    //   clearInterval: 1000 * 60 * 60, 
    // }),
  }))
  server.use('/api/users', usersRouter)
  server.use('/api/auth', authRouter)

  
server.get('/', (req, res) => {
    res.json({api: 'up'})
});

module.exports = server