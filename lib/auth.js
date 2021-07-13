const basicAuth = require('express-basic-auth')({
  users: { [process.env.API_USER]: process.env.API_PASSWORD }
})
const noAuth = (req, res, next) => next()
const isAuthEnabled = () => process.env.ENABLE_AUTH && process.env.ENABLE_AUTH.toLowerCase() === 'true'

module.exports = isAuthEnabled() ? basicAuth : noAuth