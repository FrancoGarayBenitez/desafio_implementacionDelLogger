import { Router } from 'express'
const router = Router()
import * as cartControllers from '../controllers/cart.controller.js'
import { validateQuantity, validateParam } from '../utils/utils.js'

//Import middleware para winston
import { addLogger } from '../utils/winston.js'

// Agregar productos al carrito
router.post("/:pid", addLogger, validateParam, validateQuantity, cartControllers.addProduct)

export default router