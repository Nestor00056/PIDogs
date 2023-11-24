const { Dog, Temperament, Dog_Temperament } = require("../db");
const DogDelete = async (req, res) => {
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
};

module.exports = DogDelete;
