
import { Router } from "express";
import EventService from "../services/event-service.js";
import EventLocationService from "../services/event-location-service.js";
import AuthMiddleware from "../middleware/auth-middleware.js";

const router = Router();
const EventSvc = new EventService();
const EventLocationSvc = new EventLocationService();


router.post('', AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const entity = req.body;

  let eventCapacity = await EventLocationSvc.getByIdAsync(entity.id_event_location);

  if (!entity.name || typeof entity.name !== 'string' || entity.name.length < 3) {
    return res.status(400).json({ error: "No existe ese evento" });
  }
  if (!entity.description || typeof entity.description !== 'string' || entity.description.length < 3) {
    return res.status(400).json({ error: "No existe esa descripcion de evento" });
  }
  if (!entity.id_event_category || isNaN(entity.id_event_category)) {
    return res.status(400).json({ error: "No existe esa categoria evento" });
  }
  if (!entity.id_event_location || isNaN(entity.id_event_location)) {
    return res.status(400).json({ error: "No existe ese evento con esa ubicacion" });
  }
  if (!entity.start_date || isNaN(Date.parse(entity.start_date))) {
    return res.status(400).json({ error: "No existe esa fecha de evento" });
  }
  if (entity.max_assistance > eventCapacity.max_capacity) {
    return res.status(400).json({ error: "no existe" });
  }
  if (entity.price < 0 || isNaN(entity.price)) {
    return res.status(400).json({ error: "No existe esa duracion del evento" });
  }
  if (entity.duration_in_minutes < 0 || isNaN(entity.duration_in_minutes)) {
    return res.status(400).json({ error: "No existe esa duracion de evento" });
  }
  if (typeof entity.enabled_for_enrollment !== 'boolean') {
    return res.status(400).json({ error: "No existe ese enrollment" });
  }

  console.log(entity);
  const returnArray = await EventSvc.createAsync(entity);
  if (returnArray != null) {
    response = res.status(201).json(returnArray);
  } else {
    response = res.status(500).send('Error interno');
  }
  return response;

});

router.put('', AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const entity = req.body;

  if (!entity.name || typeof entity.name !== 'string' || entity.name.length < 3) {
    return res.status(400).json({ error: "No existe ese evento" });
  }
  if (!entity.description || typeof entity.description !== 'string' || entity.description.length < 3) {
    return res.status(400).json({ error: "No existe esa descripcion de evento" });
  }
  if (!entity.id_event_category || isNaN(entity.id_event_category)) {
    return res.status(400).json({ error: "No existe esa categoria evento" });
  }
  if (!entity.id_event_location || isNaN(entity.id_event_location)) {
    return res.status(400).json({ error: "No existe ese evento con esa ubicacion" });
  }
  if (!entity.start_date || isNaN(Date.parse(entity.start_date))) {
    return res.status(400).json({ error: "No existe esa fecha de evento" });
  }
  if (entity.price < 0 || isNaN(entity.price)) {
    return res.status(400).json({ error: "No existe esa duracion del evento" });
  }
  if (entity.duration_in_minutes < 0 || isNaN(entity.duration_in_minutes)) {
    return res.status(400).json({ error: "No existe esa duracion de evento" });
  }
  if (typeof entity.enabled_for_enrollment !== 'boolean') {
    return res.status(400).json({ error: "No existe ese enrollment" });
  }

  console.log(entity);

  const returnArray = await EventSvc.updateAsync(entity);

  if (returnArray != null) {
    response = res.status(200).json(returnArray);
  } else {
    response = res.status(404).send('No existe ese evento');
  }
  return response;

});

router.delete('/:id', AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const element = req.params.id;

  const returnArray = await EventSvc.deleteAsync(element);

  if (returnArray != null) {
    response = res.status(200).json(returnArray);
  } else {
    response = res.status(404).send('No existe ese evento');
  }
  return response;
});

router.get("/:id", async (req, res) => {
  const eventId = req.params.id;

  try {
    const result = await EventSvc.getByIdAsync(eventId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "No existe ese evento" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor." });
  }
});

export default router;
