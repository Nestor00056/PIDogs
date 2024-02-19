const { Router } = require("express");
const fetchApi = require("../utils/fetch");
const { Dog, Temperament } = require("../db");
const Apikey = "live_btEA80VlYnuWgBntEoYGPLXxy2wxqZYa6y3IB9kw9cmZk77mk72Z6YU2lboAAQdE";
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/DogSearch/:race", async (req, res) => {
  try {
    if (!req.params?.race) {
      throw new Error("se necesita de un nombre para buscar la raza");
    }
    const RaceForSearch = req.params.race;
    const [apiData, DogsData] = await Promise.all([
      fetchApi(
        `https://api.thedogapi.com/v1/breeds/search?q=${RaceForSearch}&api_key=${Apikey}`
      ),
      Dog.findAll({ where: { name: RaceForSearch }, include: { model: Temperament } }),
    ]);
    /*  console.log(DogsData); //Terrier Pitbull */
    if (!DogsData) {
      DogsData = [];
    }
    let NewapiData = [],
      NewDogsData = [];
    if (apiData?.length > 0) {
      NewapiData = apiData?.map((el) => {
        let newWeight = el.weight?.metric.replace(/\s/g, "").split("-");
        let obj = {
          id: el.id,
          weight: {
            minWeight: parseInt(newWeight[0]),
            maxWeight: parseInt(newWeight[1]),
          },
          height: el?.height.metric,
          name: el?.name,
          image: el?.image.url,
          life_span: el?.life_span,
          temperament: el?.temperament,
        };

        return obj;
      });
    }

    if (DogsData?.length > 0) {
      NewDogsData = DogsData?.map((el) => {
        let temperaments = el?.Temperaments?.map((el) => {
          return el?.temperament;
        });
        let newWeight = el.weight?.replace(/\s/g, "").split("-");
        let obj = {
          id: el.id,
          weight: {
            minWeight: parseInt(newWeight[0]),
            maxWeight: parseInt(newWeight[1]),
          },
          height: el?.height,
          name: el?.name,
          image: el?.image,
          life_span: el?.life_span,
          temperament: temperaments?.join(","),
        };
        return obj;
      });
    }

    let newData = [...NewapiData, ...NewDogsData];
    let MaxPage =
      newData.length % 8 === 0 ? newData.length / 8 : parseInt(newData.length / 8) + 1;
    if (newData?.length <= 0) {
      throw new Error("No se encontraron resultados");
    }

    res.send({ MaxPage, returnData: newData, success: true });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

router.get("/home", async (req, res) => {
  try {
    const [apiData, DogsData] = await Promise.all([
      fetchApi(`https://api.thedogapi.com/v1/breeds?api_key=${Apikey}`),
      Dog.findAll({ include: { model: Temperament } }),
    ]);
    let NewapiData = apiData.map((el) => {
      let newWeight = el.weight.metric.replace(/\s/g, "").split("-");
      let obj = {
        id: el.id,
        weight: { minWeight: parseInt(newWeight[0]), maxWeight: parseInt(newWeight[1]) },
        height: el.height?.metric,
        create: false,
        name: el?.name,
        image: el?.image.url,
        life_span: el?.life_span,
        temperament: el?.temperament,
      };

      return obj;
    });

    let NewDogsData = DogsData.map((el) => {
      let temperaments = el?.Temperaments?.map((el) => {
        return el?.temperament;
      });
      let newWeight = el.weight?.replace(/\s/g, "").split("-");
      console.log();
      let obj = {
        id: el.id,
        weight: { minWeight: parseInt(newWeight[0]), maxWeight: parseInt(newWeight[1]) },
        name: el?.name,
        create: true,
        image: el?.image,
        life_span: el?.life_span,
        temperament: temperaments?.join(","),
      };
      return obj;
    });

    let data = [...NewapiData, ...NewDogsData];
    let page = parseInt(req.query.page) - 1 < 0 ? 0 : parseInt(req.query.page) - 1;
    let MaxPage = data.length % 8 === 0 ? data.length / 8 : parseInt(data.length / 8) + 1;
    let returnData = []; // lod datos a retornar
    if (page > MaxPage) {
      page = MaxPage;
    }
    if (page + 1 >= MaxPage) {
      let lastPage = data.length - page * 8;
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

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
