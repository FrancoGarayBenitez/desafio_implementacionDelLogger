import { Router } from 'express'
const router = Router()
//Import middleware para winston
import { addLogger } from '../utils/winston.js'

router.get("/loggerTest", addLogger, (req, res) => {
    req.logger.debug("Mensaje a nivel debug")
    req.logger.http("Mensaje a nivel http")
    req.logger.info("Mensaje a nivel info")
    req.logger.warning("Mensaje a nivel warning")
    req.logger.error("Mensaje a nivel error")
    req.logger.fatal("Mensaje a nivel fatal")
    res.send("Logs mostrados por consola.")
})

export default router