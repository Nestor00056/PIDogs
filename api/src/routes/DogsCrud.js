const { Router } = require("express");
const DogsCrudRouter = Router();
const { Dog, Temperament, Dog_Temperament } = require("../db");
const ValidationData = require("../middleware/ValidationReceivedData");
const fetchApi = require("../utils/fetch");
const Apikey = "live_btEA80VlYnuWgBntEoYGPLXxy2wxqZYa6y3IB9kw9cmZk77mk72Z6YU2lboAAQdE";

DogsCrudRouter.get("/Dogs", async (req, res) => {
  try {
    let data = await Dog.findAll({ include: { model: Temperament } });
    let page = parseInt(req.query.page) - 1;
    let MaxPage =
      data.length % 8 === 0
        ? data.length / 8
        : data.length / 8 < 0
        ? 1
        : data.length / 8 + 1;
    let returnData = [];
    if (page + 1 >= MaxPage && data.length > 0) {
      let lastPage = data.length < 8 ? 0 : page * 8 - data.length;
      let start = data.length < 8 ? 0 : data.length - lastPage;
      for (let index = start; index < data.length; index++) {
        returnData.push(data[index]);
      }
      return res.send(returnData);
      //
    } else if (data.length > 0) {
      console.log(data.length);
      let end = data.length < page * 8 + 8 ? data.length : page * 8 + 8;
      for (let index = page * 8; index < end; index++) {
        returnData.push(data[index]);
      }
      return res.send({
        success: true,
        message: "se han eviado los datos correctamente",
        data: returnData,
      });
    } else {
      return res.send({
        success: false,
        message: "la busqueda no se hizo correctamente o directamente no hay datos",
        data,
      });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

DogsCrudRouter.post("/Dogs", ValidationData, async (req, res) => {
  try {
    let { name, height, weight, image, temp, life_span } = req.body;
    let search = await Dog.findOne({ where: { name } });
    let searchData = await fetchApi(
      `https://api.thedogapi.com/v1/breeds/search?q=${name}`
    );
    if (search?.name === name || searchData?.name === name) {
      throw new Error("esta raza ya existe");
    }
    await Dog.create({ name, height, weight, image, life_span });
    let arrayTemp = temp.split(","); // esto lo borramos por que lo vamos enviar ya convertido en un objeto
    for (let index = 0; index < arrayTemp.length; index++) {
      // aqui cambiamos  arrayTemp por el temp original
      let [DogSearch, TemperamentSearch] = await Promise.all([
        Dog.findOne({ where: { name } }),
        Temperament.findOne({ where: { temperament: arrayTemp[index] } }), // aqui ;o mismo que en el Anterior comentario
      ]);
      await Dog_Temperament.create({
        DogId: DogSearch?.id,
        TemperamentId: TemperamentSearch?.id,
      });
    }
    res.send({
      success: true,
      message: "los datos han sido creados correctamente incluyendo temperamentos",
    });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

DogsCrudRouter.put("/Dogs", ValidationData, async (req, res) => {
  try {
    let { name, height, weight, image, temp, life_span } = req.body;
    let dataforupdate = await Dog.findOne({ where: { name } });
    if (!dataforupdate) {
      return res.send({ success: false, message: "el objeto a actualizar no existe" });
    }
    await Dog.update({ name, height, weight, image, life_span }, { where: { name } });
    let searchTemperament = await Dog_Temperament.findOne({
      where: { DogId: dataforupdate?.id },
    });
    if (searchTemperament) {
      await Dog_Temperament.destroy({ where: { DogId: dataforupdate?.id } });
    }
    if (temp?.length) {
      let newTemperaments = await Promise.all(
        temp.map(async (el) => {
          let TempId = await Temperament.findOne({ where: { temperament: el } });
          return { DogId: dataforupdate?.id, TemperamentId: TempId?.id };
        })
      );
      await Dog_Temperament.bulkCreate(newTemperaments);
    }
    /*   for (let index = 0; index < temp.length; index++) {
      let temperament = await Temperament.findOne({ where: { name: temp[index] } });
      newTemperaments.push({ DogId: dataforupdate?.id, TemperamentId: temperament.id });
    } */

    res.send({ success: true, message: "los datos se actualizaron correctamente" });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

DogsCrudRouter.delete("/Dogs", async (req, res) => {
  try {
    if (!req.body?.name) {
      throw new Error(
        "no se pueden eliminar los datos debido a que no se encuentra el las raza del perro "
      );
    }
    let { name } = req.body;
    let data = await Dog.findOne({ where: { name: name } });
    if (!data?.id) {
      throw new Error("el elemnto no existe en la base de datos");
    }
    await Dog.destroy({ where: { name } });
    await Dog_Temperament.destroy({ where: { DogId: data.id } });
    res.send({ success: true, message: "los datos han sido eliminados correctamente" });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

module.exports = DogsCrudRouter;
