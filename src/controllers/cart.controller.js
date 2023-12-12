import CustomError from '../services/errors/CustomError.js'
import {EErrors} from '../services/errors/enums.js'
import { errorFindProduct, insufficientStock, emptyProducts } from '../services/errors/info.js'
import { products } from '../controllers/products.controllers.js'
import { findProduct } from '../utils/utils.js'

let cart = {
    products: [],
    totalPrice: 0
}

export const addProduct = (req, res) => {
    let pid = req.params.pid
    let quantity = req.body.quantity

    if (products.length == 0) {
        req.logger.warning("No hay productos creados, array vacío.")
        
        CustomError.createError({
            name: "No hay productos",
            cause: emptyProducts(),
            message: "Array de productos vacío",
            code: EErrors.EMPTY_ARRAY_PRODUCTS
        })
    }

    let product = findProduct(products, pid)
    if (!product) {
        req.logger.error("No se encontró el producto.")

        CustomError.createError({
            name: "No se encontró el producto.",
            cause: errorFindProduct(),
            message: "Ingrese otro pid.",
            code: EErrors.NOT_EXISTENT_PRODUCT
        })
    } 
        

    // Validar si ya existe el producto en el cart
    let foundProductInCart = cart.products.find((p) => {
        return p.product.id == pid
    })

    if (product.stock >= quantity) {
        // Precio total
        cart.totalPrice += quantity * product.price
    
        // Actualizar stock del producto
        product.stock -= quantity
        
        // Actualizar producto en el array products
        for (let i = 0; i < products.length; i ++) {
            if (products[i].id == pid) {
                products.splice(i, 1, product)
            }
        }

        if (foundProductInCart) {
            // Índice del producto en el carrito
            const indexProduct = cart.products.findIndex((p) => p.product.id == pid)

            // Actualizar cantidad del producto en el carrito
            cart.products[indexProduct].quantity += quantity

        } else {
            // Agregar al carrito
            cart.products.push({product, quantity: quantity})
        }

    } else {
        req.logger.warning("Stock insuficiente")

        CustomError.createError({
            name: "Error al agregar producto al carrito.",
            cause: insufficientStock(product, quantity),
            message: "Error al agregar producto al carrito",
            code: EErrors.INSUFFICIENT_STOCK
        })
    }

    req.logger.info("Producto agregado al carrito.")
    res.status(200).json({message: "Success", payload: cart})
}

