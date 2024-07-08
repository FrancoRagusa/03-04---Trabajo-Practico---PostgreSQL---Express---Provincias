import {Router} from "express";
import EventService from '../services/category-service.js'

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
      respuesta = res.status(404).send(`no existe ese.`);
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
  
export default router;