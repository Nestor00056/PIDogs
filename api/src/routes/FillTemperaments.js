const { Router } = require("express");
const fillTemperaments = Router();
const Apikey = "live_btEA80VlYnuWgBntEoYGPLXxy2wxqZYa6y3IB9kw9cmZk77mk72Z6YU2lboAAQdE";
const { Temperament } = require("../db");
const fetchApi = require("../utils/fetch");

fillTemperaments.get("/fillTemperament", async (req, res) => {
  try {
    let data = await fetchApi(`https://api.thedogapi.com/v1/breeds?api_key=${Apikey}`);
    let newData = data.map((el) => {
      return el.temperament ? el.temperament.replace(/\s/g, "").split(",") : [];
    });
    let Temperaments = [];

    for (let index = 0; index < newData.length; index++) {
      const secondArray = newData[index];
      for (let j = 0; j < secondArray.length; j++) {
        if (!Temperaments.includes(secondArray[j])) {
          Temperaments.push(secondArray[j]);
        }
      }
    }
    let fullTeemperaments = Temperaments.map((el) => {
      return { temperament: el };
    });
    let result = await Temperament.bulkCreate(fullTeemperaments);
    if (result) {
      return res.status(200).send("todo se hizo correctamente");
    } else {
      return res.send("algo fallo");
    }
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});
module.exports = fillTemperaments;
