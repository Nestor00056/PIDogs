/* const ValidationData = async (req, res, next) => {
  if (!req.body?.name || !req.body?.weight || !req.body?.height || !req.body?.life_span) {
    return res.send({
      success: false,
      message: "todos los campos deben de estar completos",
    });
  } else {
    next();
  }
}; */

const ValidationData = (req, res, next) => {
  try {
    if (
      !req.body?.name ||
      !req.body?.weight ||
      !req.body?.height ||
      !req.body?.life_span ||
      !req.body?.temperament
    ) {
      console.log(req.body);
      throw new Error("los campos no deben de estar vacios");
    }
    const regex = /^\d+-\d+$/;
    let ErrorData = {};
    if (req.body?.weight?.length <= 0) {
      ErrorData.weight = "El peso no puede estar vacio";
    }
    if (req.body.name?.length <= 0) {
      ErrorData.name = "Este campo no debe de estar vacio";
    }
    if (regex.test(req.body?.weight)) {
      let Array = req.body?.weight.replace(/\s/g, "").split("-");
      Array.forEach((el) => {
        if (parseInt(el) <= 0) {
          ErrorData.weight = "El peso minimo o maximo no puede ser 0";
        }
        if (parseInt(Array[0]) > parseInt([Array[1]])) {
          ErrorData.weight = "El peso minimo no puede ser mayor al peso maximo";
        }
      });
    } else {
      if (req.body?.weight) {
        ErrorData.weight = "los datos no coinciden de la forma necesaria ej: 10-20";
      }
    }
    if (req.body?.temperament?.length <= 0) {
      ErrorData.temperament = "El temperamento, no de debe de estar vacio";
    }

    if (regex.test(req.body?.life_span)) {
      let Array = req.body?.life_span.replace(/\s/g, "").split("-");
      Array.forEach((el) => {
        if (parseInt(el) <= 0) {
          ErrorData.life_span = "La esperanza de vida  minima o maxima no puede ser 0";
        }
        if (parseInt(Array[0] > Array[1])) {
          ErrorData.life_span =
            "La esperanza de vida minima no puede ser mayor a la esperanza de vida maxima";
        }
      });
    } else {
      if (req.body?.life_span) {
        ErrorData.life_span = "los datos no coinciden con el formato necesario";
      }
    }

    if (regex.test(req.body?.height)) {
      let Array = req.body.height.replace(/\s/g, "").split("-");
      Array.forEach((el) => {
        if (parseInt(el) <= 0) {
          ErrorData.height = "La altura minima o maxima no puede ser 0";
        }
        if (parseInt(Array[0]) > parseInt([Array[1]])) {
          ErrorData.height = "La altura minima no puede ser menor a la  altura maxima";
        }
      });
    } else {
      if (req.body?.height) {
        ErrorData.height = "los datos no coinciden de la forma necesaria ej: 10-20";
      }
    }

    if (
      !ErrorData?.name &&
      !ErrorData?.weight &&
      !ErrorData?.height &&
      !ErrorData?.temperament &&
      !ErrorData?.life_span
    ) {
      next();
    } else {
      throw new Error("Alguno de los campos no cumple los requisitos ");
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};
module.exports = ValidationData;
