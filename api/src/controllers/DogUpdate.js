const { Dog, Temperament, Dog_Temperament } = require("../db");

const DogUpdate = async (req, res) => {
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
};

module.exports = DogUpdate;
