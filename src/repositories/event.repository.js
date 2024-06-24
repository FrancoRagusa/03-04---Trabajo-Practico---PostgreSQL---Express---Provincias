
import {Router} from "express"
import EventService from '../services/event-service.js'
import EventLocationService from '../services/eventLocation-service.js'
import UserService from "../services/user-service.js"
const router = Router()
import jwt from 'jsonwebtoken'
const svcE = new EventLocationService()
const svc = new EventService()
const svu = new UserService()
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
router.get('',async (req,res)=> {
    const {name,category,startdate,tag} = req.query
    let querysUser = []
    if(name != undefined) {
        querysUser.push({
            "data" : "name",
            "value" : name,
            "s" : "e"
        })
    } 
    if(category != undefined) {
        querysUser.push({
            "data" : "name",
            "value" : category,
            "s" : "c"
        })
    } 
    if(startdate != undefined) {
        querysUser.push({
            "data" : "start_date",
            "value" : startdate,
            "s" : "e"
        })
    } 
    if(tag != undefined) {
        querysUser.push({
            "data" : "name",
            "value" : tag,
            "s" : "t"
        })
    } 
    let query = "select e.*"
    query+= " FROM events e INNER JOIN event_categories c ON e.id_event_category = c.id INNER JOIN event_tags f ON e.id = f.id_event INNER JOIN tags t ON f.id_tag = t.id WHERE "
    querysUser.forEach((element,i) => {
        if(i == 0) {
            query += element.s +"." + element.data +" = "+ "'"+element.value+"'" 
        } else {
            query += " AND "+element.s +"." + element.data +" = "+ "'"+element.value+"'"
        }
    });
    let respuesta
    const returnArray = await svc.getAllAsync(query)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
router.get('/:id',async (req,res)=> {
    let respuesta
    const returnArray = await svc.getIdAsync(req.params.id)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
router.post("",TokenMiddleWare,async (req,res)=> {
    let respuesta
    let capacidad = await svcE.getAllAsyncId(req.body.id_event_location)
    if(req.body.name == "" || req.body.description == "" || req.body.price < 0 || req.body.duration_in_minutes < 0 || req.body.max_assistance > capacidad[0].max_capacity) {
        respuesta = res.status(400).json("Bad Request")
    } else {
        const returnArray = await svc.createAsync(req.body)
        if(returnArray != null) {
            respuesta = res.status(200).json(returnArray)
        } else {
            respuesta = res.status(500).json("Error Interno")
        }
    }

    return respuesta
})

router.put("",TokenMiddleWare,async (req,res)=> {
    let respuesta
    const returnArray = await svc.updateAsync(req.body)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
router.delete("/:id",TokenMiddleWare,async (req,res)=> {
    let respuesta
    const returnArray = await svc.DeleteByIdAsync(req.params.id)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
router.delete("/:id/enrollment",TokenMiddleWare,async (req,res)=> {
    let respuesta
    const returnArray = await svc.DeleteByIdEnrollmentAsync(req.params.id)
    const event = await svc.getAllAsync(eventId);
    if(returnArray != null || new Date(event[0].start_date) <= new Date()) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
})
router.post("/:id/enrollment", TokenMiddleWare, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    let payloadOriginal = await jwt.verify(token, "MatiPalito");
    const eventId = req.params.id; 
    const event = await svc.getAllAsync(eventId);
    const idUser = await svu.GetId(payloadOriginal.username)
    const svcES = await svc.GetEnrollment(eventId);
    const datos = {
        "id_event": eventId,
        "id_user": idUser[0].id,
        "description": "muy bueno",
        "registration_date_time": new Date(),
        "attended": 1,
        "observations": "muy bueno",
        "rating": 10
    };
    if (event[0].max_assistance < svcES.length || new Date(event[0].start_date) <= new Date() || event[0].enabled_for_enrollment == 0) {
        res.status(400).json("Bad Request"); 
    } else {
        const returnArray = await svc.createEnrrollmentAsync(datos);
        if (returnArray != null) {
            res.status(200).json(returnArray); 
        } else {
            res.status(500).json("Error Interno"); 
        }
    }
});
router.get("/:id/enrollment",async(req,res)=> {
    const {id} = req.params
    const {first_name,last_name,username,attended,rating} =  req.query 
    let querysUser = []  
    let queryN = []
    if(first_name != undefined) {
        querysUser.push({
            "data" : "first_name",
            "value" : first_name,
            "s" : "u"
        })
    } 
    if(last_name != undefined) {
        querysUser.push({
            "data" : "last_name",
            "value" : last_name,
            "s" : "u"
        })
    }
    if(username != undefined) {
        querysUser.push({
            "data" : "username",
            "value" : username,
            "s" : "u"
        })
    }
    if(attended != undefined) {
        querysUser.push({
            "data" : "attended",
            "value" : attended,
            "s" : "e"
        })
    }
    if(rating != undefined) {
        querysUser.push({
            "data" : "rating",
            "value" : rating,
            "s" : "e"
        })
    }
    let query = "select *"
    query+= " FROM event_enrollments e INNER JOIN users u ON e.id_user = u.id WHERE e.id_event = " + id +" AND "
    querysUser.forEach((element,i) => {
        if(i == 0) {
            query += element.s +"." + element.data +" = "+ "'"+element.value+"'" 
        } else {
            query += " AND "+element.s +"." + element.data +" = "+ "'"+element.value+"'"
        }
    });
    const returnArray = await svc.getEnrollment(query);
        if (returnArray != null) {
            res.status(200).json(returnArray); 
        } else {
            res.status(500).json("Error Interno"); 
        }
})

export default router
