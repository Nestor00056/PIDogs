const ValidationData = (Data) => {
  const regex = /^\d+-\d+$/;
  let error = {};

  if (Data?.name.length <= 0) {
    error.name = "Este campo no debe de estar vacio";
  }

  if (regex.test(Data?.weight)) {
    let Array = Data.weight.replace(/\s/g, "").split("-");
    Array.forEach((el) => {
      if (parseInt(el) <= 0) {
        error.weight = "El peso minimo o maximo no puede ser 0";
      }
    });
  } else {
    error.weight = "los datos no coinciden de la forma necesaria ej: 10-20";
  }
  if (Data?.temperament.length <= 0) {
    error.temperament = "El temperamento, no de debe de estar vacio";
  }

  if (regex.test(Data?.life_span)) {
    let Array = Data.life_span.replace(/\s/g, "").split("-");
    Array.forEach((el) => {
      if (parseInt(el) <= 0) {
        error.life_span = "La esperanza de vida  minima o maxima no puede ser 0";
      }
    });
  } else {
    error.life_span = "los datos no coinciden con el formato necesario";
  }

  if (regex.test(Data?.height)) {
    let Array = Data.height.replace(/\s/g, "").split("-");
    Array.forEach((el) => {
      if (parseInt(el) <= 0) {
        error.height = "La altura minima o maxima no puede ser 0";
      }
    });
  } else {
    error.height = "los datos no coinciden de la forma necesaria ej: 10-20";
  }
  return error;
};

export default ValidationData;

console.log("10-10".split("-"));
console.log();
