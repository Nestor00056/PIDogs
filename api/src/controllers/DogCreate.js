const { Dog, Temperament, Dog_Temperament } = require("../db");
const fetchApi = require("../utils/fetch");
const Apikey = "live_btEA80VlYnuWgBntEoYGPLXxy2wxqZYa6y3IB9kw9cmZk77mk72Z6YU2lboAAQdE";

const DogCreate = async (req, res) => {
  try {
    let { name, height, weight, image, temperament, life_span } = req.body;
    let search = await Dog.findOne({ where: { name } });
    let Data = await fetchApi(`https://api.thedogapi.com/v1/breeds?api_key=${Apikey}`);
    let searchData = Data.filter((el) => {
      let parseName = name.toLowerCase().replace(/\s/g, "");
      let elementName = el.name.toLowerCase().replace(/\s/g, "");
      if (elementName === parseName) {
        return el;
      }
    });
    if (search?.name === name || searchData?.length > 0) {
      throw new Error("esta raza ya existe");
    }
    await Dog.create({ name, height, weight, image, life_span });
    if (temperament) {
      let temperamentTwo =
        temperament[temperament.length - 1] === ","
          ? temperament.substring(0, temperament.length - 1)
          : `${temperament}`;
      let arrayTemp = temperamentTwo.split(","); // esto lo borramos por que lo vamos enviar ya convertido en un objeto
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
    }
    res.send({
      success: true,
      message: "los datos han sido creados correctamente incluyendo temperamentos",
    });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

module.exports = DogCreate;
