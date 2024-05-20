import {Router} from "express";
import EventService from '../services/user-service.js'

const router = Router();
const svc = new EventService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAllAsync();
    if (returnArray != null){
      respuesta = res.status(200).json(returnArray);
    } else {
      respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
  });
  
  router.get('/:id', async (req, res) => {
    let respuesta;
    console.log("cofa", req.params.id);
  const returnArray = await svc.getByIdAsync(req.params.id);
    if (returnArray != null){
      respuesta = res.status(200).json(returnArray);
    } else {
      respuesta = res.status(500).send(`no existe ese.`);
    }
    return respuesta;
  })
  
  router.post("",async (req,res)=> {
    let respuesta
    console.log(req.body)
    const returnArray = await svc.createAsync(req.body)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
  })
  router.put("",async (req,res)=> {
    let respuesta
    const returnArray = await svc.updateAsync(req.body)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
  })
  router.delete("/:id",async (req,res)=> {
    let respuesta
    const returnArray = await svc.DeleteByIdAsync(req.params.id)
    if(returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } else {
        respuesta = res.status(500).json("Error Interno")
    }
    return respuesta
  })
  

  router.get('/:name&password', async (req, res) => {
    let respuesta;

  const returnArray = await svc.getByTokenAsync(req.params.name,req.params.password);
    if (returnArray != null){
      respuesta = res.status(200).json(returnArray);
    } else {
      respuesta = res.status(500).send(`no existe ese.`);
    }
    const payload ={
        id:123,
        username: 'matuteEsteves'
      };
    
      const sectreKey = 'merlini36';
    
      const options = {
        expiresIn:'1h',
        issuer: 'nuestra_organizacion'
      }
    
      const token = jwt.sign(payload, sectreKey, options);
      console.log(token);
    return respuesta;
  })

  
  
export default router;