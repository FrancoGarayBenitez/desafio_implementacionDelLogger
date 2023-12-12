import CustomError from '../services/errors/CustomError.js'
import {EErrors} from '../services/errors/enums.js'
import {createProduct, findProduct } from '../utils/utils.js'
import { errorFindProduct, generateProductErrorInfo } from '../services/errors/info.js'

export let products = []

// Crear y obtener productos
const getProducts = (req, res ) => {

    for ( let i = 0; i < 100; i++) {
        let generatedProduct = createProduct()
        let {title, category, price, stock} = generatedProduct

        // Instancia para crear el error
        if (!title || !category || !price || !stock) {
            CustomError.createError({
                name: "Error en la creación del producto",
                cause: generateProductErrorInfo({ title, category, price, stock }),
                message: "Error al intentar crear un producto",
                code: EErrors.NOT_EXISTENT_PROPERTY
            })
        }

        // Id autoincrementable
        if (products.length === 0) {
            generatedProduct.id = 1
        } else {
            generatedProduct.id = products[products.length - 1].id + 1
        }

        // Si no hay error se agregará el producto al array y se crearán 99 más
        products.push(generatedProduct)
    }

    req.logger.info("Productos obtenidos correctamente.")
    res.status(200).json({status:"Success", payload: products})
}


// Obtener producto por su ID
const getProductById = (req, res) => {
    const {pid} = req.params

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
    
    req.logger.info("Producto obtenido correctamente.")
    res.status(200).json({status:"Success", payload: product})
}

export {getProducts, getProductById}

