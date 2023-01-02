const router = require("express").Router()

router.use('/contracts', require('./contracts'))
router.use('/user', require('./user'))

module.exports = router
