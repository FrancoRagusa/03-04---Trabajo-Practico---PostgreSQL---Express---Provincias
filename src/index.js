import express from "express";
import cors from "cors";
import ProvinceRouter from "./controllers/province-controller.js"
import EventRouter from "./controllers/event_categories-controller.js"
import EventLocationRouter from "./controllers/event_location-controller.js"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/province", ProvinceRouter);
app.use("/api/event_categories", EventRouter);
app.use("/api/event_location", EventLocationRouter);

app.listen(port, ()=> {
    console.log(`Listening on http://localhost:${port}`)
})