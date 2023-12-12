import {EErrors} from '../../services/errors/enums.js'

export default (error, req, res, next) => {

    if (!error.cause) req.logger.warning(`Causa indefinida, se recibió ${error.cause}`)
    else req.logger.info(`${error.cause}`)

    switch (error.code) {
        case EErrors.NOT_EXISTENT_PROPERTY:
            res.send({status:"error", error: error.name})
            break;
        case EErrors.INVALID_PARAM:
            res.send({status:"error", error: error.name})
            break;
        case EErrors.INVALID_QUANTITY:
            res.send({ status: "error", error: error.name })
            break;
        case EErrors.INSUFFICIENT_STOCK:
            res.send({ status: "error", error: error.name })
            break;
        case EErrors.EMPTY_ARRAY_PRODUCTS:
            res.send({ status: "error", error: error.name })
            break;
        case EErrors.NOT_EXISTENT_PRODUCT:
            res.send({ status: "error", error: error.name })
            break;
        default:
            res.send({status:"error", error:"Error desconocido."})
    }
}