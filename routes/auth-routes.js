const Router = require('express')

const authHandlers = require("../handlers/auth-handlers")

const router = new Router()

router.get('/authorization', authHandlers.authorization)
router.post('/authentication', authHandlers.authentication)
router.get('/logout', authHandlers.logout)

module.exports = router