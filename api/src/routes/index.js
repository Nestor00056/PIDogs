const { Router } = require("express");
const fetchApi = require("../utils/fetch");
const { Dog, Temperament } = require("../db");
const Apikey = "live_btEA80VlYnuWgBntEoYGPLXxy2wxqZYa6y3IB9kw9cmZk77mk72Z6YU2lboAAQdE";
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/home", async (req, res) => {
  try {
    const [apiData, DogsData] = await Promise.all([
      fetchApi(`https://api.thedogapi.com/v1/breeds?api_key=${Apikey}`),
      Dog.findAll({ include: { model: Temperament } }),
    ]);
    let data = [...apiData, ...DogsData];
    let page = parseInt(req.query.page) - 1;
    let MaxPage = data.length % 8 === 0 ? data.length / 8 : parseInt(data.length / 8) + 1;
    let returnData = [];
    console.log(data.length);
    if (page + 1 >= MaxPage) {
      let lastPage = page * 8 - data.length;
      for (let index = data.length - lastPage; index < data.length; index++) {
        returnData.push(data[index]);
      }
      return res.send({ MaxPage, returnData, success: true });
    }
    for (let index = page * 8; index < page * 8 + 8; index++) {
      returnData.push(data[index]);
    }
    res.send({ MaxPage, returnData, success: true });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

router.get("/Dogs/:name", async (req, res) => {
  try {
    if (!req.params?.name) {
      throw new Error("error se necesita el nombre de la raza");
    }
    let name = req.params?.name;
    let data = await Dog.findOne({ where: { name }, include: { model: Temperament } });
    if (!data?.id) {
      throw new Error("La raza  no existe");
    }

    res.send({ success: true, data });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
