const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.get('/devices',basketController.getAlldeviceBasket)
router.get('/', basketController.getAllBasket)
router.post('/', basketController.create)

module.exports = router