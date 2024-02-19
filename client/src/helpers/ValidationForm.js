const ValidationData = (Data) => {
  const regex = /^\d+-\d+$/;
  let error = {};

  if (Data?.name?.length <= 0) {
    error.name = "Este campo no debe de estar vacio";
  }

  if (regex.test(Data?.weight)) {
    let Array = Data.weight.replace(/\s/g, "").split("-");
    Array.forEach((el) => {
      if (parseInt(el) <= 0) {
        error.weight = "El peso minimo o maximo no puede ser 0";
      }
      if (parseInt(Array[0]) > parseInt([Array[1]])) {
        error.weight = "El peso minimo no puede ser mayor al peso maximo";
      }
    });
  } else {
    if (Data?.weight) {
      error.weight = "los datos no coinciden de la forma necesaria ej: 10-20";
    }
  }
  if (Data?.temperament?.length <= 0) {
    error.temperament = "El temperamento, no de debe de estar vacio";
  }

  if (regex.test(Data?.life_span)) {
    let Array = Data.life_span.replace(/\s/g, "").split("-");
    Array.forEach((el) => {
      if (parseInt(el) <= 0) {
        error.life_span = "La esperanza de vida  minima o maxima no puede ser 0";
      }
      if (parseInt(Array[0] > Array[1])) {
        error.life_span =
          "La esperanza de vida minima no puede ser mayor a la esperanza de vida maxima";
      }
    });
  } else {
    if (Data?.life_span) {
      error.life_span = "los datos no coinciden con el formato necesario";
    }
  }

  if (regex.test(Data?.height)) {
    let Array = Data.height.replace(/\s/g, "").split("-");
    Array.forEach((el) => {
      if (parseInt(el) <= 0) {
        error.height = "La altura minima o maxima no puede ser 0";
      }
      if (parseInt(Array[0]) > parseInt([Array[1]])) {
        error.height = "La altura minima no puede ser menor a la  altura maxima";
      }
    });
  } else {
    if (Data?.height) {
      error.height = "los datos no coinciden de la forma necesaria ej: 10-20";
    }
  }
  return error;
};

export default ValidationData;

console.log("10-10".split("-"));
console.log();
