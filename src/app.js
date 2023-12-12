import express from 'express'
const app = express()
const PORT = 8080

//Middleware para analizar el cuerpo de las solicitudes.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import loggerRouter from './routes/logger.router.js'

// Middleware para el manejo de errores
import errorHandler from './middlewares/errors/index.js'

app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
app.use("/", loggerRouter)
app.use(errorHandler)

// Servidor escuchando 
app.listen(PORT, () => {
    console.log(`Servidor is running on port ${PORT}`);
})