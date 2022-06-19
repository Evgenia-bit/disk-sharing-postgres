const Router = require('express')
const router = new Router()
const authHandlers = require("../handlers/auth-handlers")

router.get('/authorization', authHandlers.authorization)
router.post('/authentication', authHandlers.authentication)
router.get('/logout', authHandlers.logout)

module.exports = router