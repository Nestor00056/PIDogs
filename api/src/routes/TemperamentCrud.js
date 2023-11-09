const { Router } = require("express");
const TempRouter = Router();
const { Dog, Temperament, Dog_Temperament } = require("../db");

TempRouter.get("/temperaments", async (req, res) => {
  try {
    let data = await Temperament.findAll();
    if (!data) {
      throw new Error("No hay temperamentos qe mostrar");
    }
    res.send({ success: true, message: "Envio de datos exitoso", data });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

TempRouter.post("/Temperaments", async (req, res) => {
  try {
    if (!req.body?.Temperament) {
      throw new Error("Se necesita el nombre del nuevo temperamento");
    }
    let searchData = await Temperament.findOne({
      where: { temperament: req.body.Temperament },
    });
    if (searchData) {
      throw new Error("El temperamento ya existe");
    }
    await Temperament.create({ temperament: req.body.Temperament });
    res.send({
      success: true,
      message: "el nuevo temperamento ha sido creado correctamente",
    });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

TempRouter.put("/Temperaments", async (req, res) => {
  try {
    let { id, temperament } = req.body;
    if (!temperament || !id) {
      throw new Error(`Se necesita los datos correspondientes para actualizar `);
    }
    let searchData = await Temperament.findOne({ where: { id } });
    if (!searchData) {
      throw new Error("El temperamento no existe");
    }

    await Temperament.update({ temperament }, { where: { id } });
    res.send({ success: true, message: "los datos se han actualizado correctamente" });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

TempRouter.delete("/Temperaments", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new Error("se necesita el identificador para poder  realizar la operacion");
    }
    const [TemperamentRelation, TemperamentData] = await Promise.all([
      Dog_Temperament.findOne({ where: { TemperamentId: id } }),
      Temperament.findOne({ where: { id } }),
    ]);
    if (!TemperamentData) {
      throw new Error("los datos a borrar no existen");
    }
    await Temperament.destroy({ where: { id } });
    if (TemperamentRelation) {
      await Dog_Temperament.destroy({ where: { TemperamentId: id } });
    }

    res.send({ success: true, message: "los datos se han borrado correctamente" });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});
module.exports = TempRouter;
