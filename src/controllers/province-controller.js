import {Router} from 'express';
import ProvinceService from './../services/province-service.js'
const router = Router();
const svc    = new ProvinceService();		// Instanciación del Service.

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
const returnArray = await svc.getByIdAsync(req.query.id);
  if (returnArray != null){
    respuesta = res.status(200).json(returnArray);
  } else {
    respuesta = res.status(500).send(`Error interno.`);
  }
  return respuesta;
})

/*
router.post('', async (req, res) => {
  let respuesta;
  const returnArray = await svc.createAsync(req.body);
  if (returnArray != null){
    respuesta = res.status(200).json(returnArray);
  } else {
    respuesta = res.status(500).send(`Error interno.`);
  }
  return respuesta;
})
router.put('', async (req, res) => {
  let respuesta;
  const returnArray = await svc.updateAsync(req.body);
  if (returnArray != null){
    respuesta = res.status(200).json(returnArray);
  } else {
    respuesta = res.status(500).send(`Error interno.`);
  }
  return respuesta;
})
router.delete('/:id', async (req, res) => {
  let respuesta;
  const returnArray = await svc.DeleteByIdAsync(req.query.id);
  if (returnArray != null){
    respuesta = res.status(200).json(returnArray);
  } else {
    respuesta = res.status(500).send(`Error interno.`);
  }
  return respuesta;
})
*/
export default router;