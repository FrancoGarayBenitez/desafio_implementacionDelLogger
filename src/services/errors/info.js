
const generateProductErrorInfo = (product) => {
    return `Uno o más propiedades están incompletas
    Lista de propiedades requeridas:
    * title: se recibió ${product.title}
    * category: se recibió ${product.category}
    * price: se recibió ${product.price}
    * stock: se recibió ${product.stock}`
}

const errorFindProduct = () => {
    return `El producto con el pid indicado no existe.`
}

const invalidParam = (pid) => {
    return `Parámetro faltante o inválido.
    * pid: necesita ser un Number, se recibió ${pid}`
}

const insufficientStock = (product, quantity) => {
    return `Stock insuficiente.
    * La cantidad solicitada es superior al stock del producto
    Se recibió cantidad ${quantity} y su stock es ${product.stock}`
}

const invalidQuantity = (quantity) => {
    return `Parámetro faltante o inválido.
    * quantity: necesita ser un Number, se recibió ${quantity}`
}

const emptyProducts = () => {
    return `Array de productos vacío.`
} 

export {
    generateProductErrorInfo,
    errorFindProduct,
    invalidParam,
    insufficientStock,
    invalidQuantity,
    emptyProducts
}