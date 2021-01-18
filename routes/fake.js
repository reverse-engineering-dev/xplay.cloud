const Router = require('express').Router
const router = new Router()

router.post('/users', require('./fake/users'))
router.post('/play-accs', require('./fake/micAcc'))

module.exports  = router