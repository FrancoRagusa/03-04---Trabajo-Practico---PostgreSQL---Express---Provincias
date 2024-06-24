// import express from 'express';
// import AuthService from '../services/auth-service.js';
// import jwt from 'jsonwebtoken';
// const router = express.Router();

// const secretKey = 'mysecretkey';
// const svc = new AuthService();


import {Router} from "express"
import UserService from '../services/user-service.js'
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
    const { email, password } = req.body;
  
    const { user, error } = await svc.loginAsync(email, password);
    if (error) {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    } else {
      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    }
  });
  
  export default router;

