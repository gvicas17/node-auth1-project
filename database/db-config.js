const knex = require('knex')

const knexfile = require('../knexfile')
const environment = process.env.NODE_ENV || 'development'

module.exports = knexc(knexfile[environment])