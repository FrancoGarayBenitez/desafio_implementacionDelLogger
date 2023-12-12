import winston from 'winston'
import dotenv from 'dotenv'
dotenv.config()

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'black',
        warning: 'yellow',
        info: 'blue',
        debug: 'gray'
    }
}


// Config winston entorno desarrollo
const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    
    transports: [
        new winston.transports.Console({
            level:'debug',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            ),
        }),

        new winston.transports.File({
            level:'error',
            filename: "errors.log",
            format: winston.format.simple()
        })
    ]
})


// Config winston entorno productivo
const prodLogger = winston.createLogger({
    levels: customLevelOptions.levels,

    transports: [
        new winston.transports.Console({
            level:'info',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        }),

        new winston.transports.File({
            level:'error',
            filename: '../errors.log',
            format: winston.format.simple()
        })
    ]
})


export const addLogger = (req, res, next) => {
    if (process.env.NODE_ENV === "production") {
        req.logger = prodLogger
        req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    } else {
        req.logger = devLogger
        req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    }
    next()
}
