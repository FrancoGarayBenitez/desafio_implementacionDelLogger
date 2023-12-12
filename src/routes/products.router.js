import { Router } from 'express'
const router = Router()
import * as productsControllers from '../controllers/products.controllers.js'
import { validateParam } from '../utils/utils.js'

//Import middleware para winston
import { addLogger } from '../utils/winston.js'

// Mocking (Crear y obtener lista de productos)
router.get("/mockingproducts", addLogger, productsControllers.getProducts)

// Obtener un producto por ID
router.get("/:pid", addLogger, validateParam, productsControllers.getProductById)

export default router