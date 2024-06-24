import {Router} from "express"
import eventEnrollment from '../services/eventEnrollment-service.js'
import EventService from '../services/event-service.js'
import EventLocationService from '../services/eventLocation-service.js'
const router = Router()
const svcE = new EventLocationService()
const svcES = new EventService()
const svc = new eventEnrollment()
const TokenMiddleWare = async function (req,res,next) {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            let payloadOriginal = await jwt.verify(token,"MatiPalito" )
        } catch (error) {
            return res.status(401).json("Unauthorized")
        }
        next()
    } else {
        return res.status(401).json("Unauthorized")
    }

}
router.post(":id/enrollment",TokenMiddleWare,(async (req,res)=> {
    console.log("asd")
    const token = req.headers.authorization.split(' ')[1];
    let payloadOriginal = await jwt.verify(token,"MatiPalito" )
    const eventId = req.query.params.id
    const eventMax = await svcE.getAllAsyncId(eventId)
    const eventAssistance = await svc.getAllAsync(eventId)
    const svcES = await svc.getAllAsync(eventId)
    const datos = {
        "id_event" : eventId,
        "id_user" :  1,
        "description" : "muy bueno",
        "registration_date_time" : new Date(),
        "attended" : true,
        "observations" : "muy bueno",
        "rating" : 10
    }
    console.log(eventMax[0].max_assistance)
    console.log(eventAssistance.attended)
    if(eventMax[0].max_assistance <  eventAssistance.attended || svcES[0].start_date <=new Date() || svcES[0].enabled_for_enrollment == false) {
        respuesta = res.status(400).json("Bad Request")
    } else {
        const returnArray = await svc.createAsync(datos)
        if(returnArray != null) {
            respuesta = res.status(200).json(returnArray)
        } else {
            respuesta = res.status(500).json("Error Interno")
        }
    }
}))

export default router