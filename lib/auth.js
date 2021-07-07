const basicAuth = require('express-basic-auth')({
  users: { [process.env.USER]: process.env.PASSWORD}
})
const noAuth = (req, res, next) => next()
const isAuthEnabled = () => process.env.ENABLE_AUTH.toLowerCase() === 'true'

module.exports = isAuthEnabled() ? basicAuth : noAuth