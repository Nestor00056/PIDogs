const { Router } = require("express");
const DogsCrudRouter = Router();
const { Dog, Temperament, Dog_Temperament } = require("../db");
const ValidationData = require("../middleware/ValidationReceivedData");
const fetchApi = require("../utils/fetch");
const DogRead = require("../controllers/DogRead");
const DogCreate = require("../controllers/DogCreate");
const DogUpdate = require("../controllers/DogUpdate");
const DogDelete = require("../controllers/DogDelete");
const ValidationDataUpdate = require("../middleware/ValidationDataUpdate");
const Apikey = "live_btEA80VlYnuWgBntEoYGPLXxy2wxqZYa6y3IB9kw9cmZk77mk72Z6YU2lboAAQdE";

DogsCrudRouter.get("/Dogs", DogRead);

DogsCrudRouter.post("/Dogs", ValidationData, DogCreate);

DogsCrudRouter.put("/Dogs", ValidationDataUpdate, DogUpdate);

DogsCrudRouter.delete("/Dogs", DogDelete);

module.exports = DogsCrudRouter;
