const { Router } = require("express");
const productRouter = Router();
const ProductController = require('../controller/product')

productRouter.post('/product', ProductController.create)
productRouter.get('/product/:id', ProductController.findById)
productRouter.get('/product', ProductController.findAll)
productRouter.put('/product/:id', ProductController.update)
productRouter.delete('/product/:id', ProductController.delete)

module.exports = productRouter;