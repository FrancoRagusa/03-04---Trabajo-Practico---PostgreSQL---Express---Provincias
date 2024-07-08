import {Router} from "express"
import UserService from '../services/auth-service.js'
import jwt from 'jsonwebtoken'
const router = Router()
const svc = new UserService()
router.post("/register",async (req,res)=> {
    let respuesta
    if(req.body.first_name == "" || req.body.last_name == "" || !req.body.username.includes("@") || req.body.password.length < 3) {
 
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
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    
    const resultado = await svc.loginAsync(username, password);
    if (!resultado.success) {
      return res.status(401).json(resultado);
    } else {
        return res.json(resultado);
    }
  });
  
  export default router;

