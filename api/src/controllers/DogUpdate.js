const { Dog, Temperament, Dog_Temperament } = require("../db");

const DogUpdate = async (req, res) => {
  try {
    let { data, newData } = req.body;
    let { name, height, weight, image, temperament, life_span } = newData;
    let dataforupdate = await Dog.findOne({ where: { name: data.name } });
    if (!dataforupdate) {
      return res.send({ success: false, message: "el objeto a actualizar no existe" });
    }
    await Dog.update(
      { name, height, weight, image, life_span },
      { where: { name: data.name } }
    );
    let searchTemperament = await Dog_Temperament.findAll({
      where: { DogId: dataforupdate?.id },
    });
    if (searchTemperament.length > 0) {
      await Dog_Temperament.destroy({ where: { DogId: dataforupdate?.id } });
    }

    if (typeof temperament === "string" && temperament) {
      console.log(temperament);
      let temperamentTwo =
        temperament[temperament.length - 1] === ","
          ? temperament.substring(0, temperament.length - 1)
          : `${temperament}`;
      let newTemp = temperamentTwo.replace(/\s/g, "").split(",");
      let newTemperaments = [];
      for (let index = 0; index < newTemp.length; index++) {
        let TempId = await Temperament.findOne({
          where: { temperament: newTemp[index] },
        });
        newTemperaments.push({
          DogId: dataforupdate?.id,
          TemperamentId: await TempId?.id,
        });
      }

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
