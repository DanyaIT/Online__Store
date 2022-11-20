const {Basket,BasketDevice, Device} = require('../models/models')


class basketController {
    async create (req,res){
        let {basketId, deviceId, count} = req.body
        const basket_device = await BasketDevice.create({basketId, deviceId, count:1})
        return res.json(basket_device)
    }

    async getAllBasket(req, res) {
        const basket = await BasketDevice.findAll()
        return res.json(basket);
      }

    async getAlldeviceBasket(req,res){
        // let deviceId = localStorage.getItem('product')
        const devices = await Device.findAll({where:{
            id: 112
        }})
        return res.json(devices)
    }
}

module.exports = new basketController


