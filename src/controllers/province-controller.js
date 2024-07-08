import {Router} from 'express';
import ProvinceService from './../services/province-service.js'
const router = Router();
const svc    = new ProvinceService();

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
  console.log("COFAAAAA");
  console.log("req.params.id", req.params.id);
  const returnEntity = await svc.getByIdAsync(req.params.id);
  if (returnEntity != null){
    respuesta = res.status(200).json(returnEntity);
  } else {
    respuesta = res.status(404).send(`Not Found.`);
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