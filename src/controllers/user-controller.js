import {Router} from "express"
import UserService from '../services/user-service.js'
import jwt from 'jsonwebtoken'
const router = Router()
const svc = new UserService()
router.post("/register",async (req,res)=> {
    let respuesta
    if(req.body.first_name == "" || req.body.last_name == "" || req.body.username.includes("@") || req.body.password.length < 3) {
        respuesta = res.status(400).json("Bad request")
    } else {
        const returnArray = await svc.createAsync(req.body)
        console.log("ReturnArray", returnArray);
        if(returnArray != null) {
            respuesta = res.status(200).json(returnArray)
        } else {
            respuesta = res.status(500).json("Error Interno")
        }
        return respuesta
    }

})
router.post("/login",async (req,res)=> {
            let respuesta;
            const returnArray = await svc.LoginAsync(req.body)
          if(returnArray != null) {
            const secretKey = "perritoBarrios"
            const options = {
                expiresIn : '1h',
                issuer : 'eventos'
            }
            
            if(returnArray != null) 
          {
              respuesta = res.status(200).json(returnArray)
              const token = jwt.sign( req.body,secretKey,options); 
              console.log("Token=",token)
          } else 
          {
              respuesta = res.status(500).json("Error Interno")
          }
          return respuesta
      
            
               }
})
export default router