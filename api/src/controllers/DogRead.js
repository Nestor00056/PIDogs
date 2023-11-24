const { Dog, Temperament, Dog_Temperament } = require("../db");

const DogRead = async (req, res) => {
  try {
    let data = await Dog.findAll({ include: { model: Temperament } });
    let newData = data.map((el) => {
      //---------------- normalizacion de los datos-------
      let temperaments = el?.Temperaments?.map((el) => {
        return el?.temperament;
      });
      let newWeight = el.weight?.replace(/\s/g, "").split("-");
      console.log();
      let obj = {
        id: el.id,
        weight: { minWeight: parseInt(newWeight[0]), maxWeight: parseInt(newWeight[1]) },
        height: el?.height,
        name: el?.name,
        create: true,
        image: el?.image,
        life_span: el?.life_span,
        temperament: temperaments?.join(","),
      };
      return obj;
    });
    //---------------- normalizacion de los datos-------
    let page = parseInt(req.query.page) - 1;
    let MaxPage = parseInt(
      data.length % 8 === 0
        ? data.length / 8
        : data.length / 8 < 0
        ? 1
        : data.length / 8 + 1
    );
    let returnData = [];
    if (page + 1 >= MaxPage && data.length > 0) {
      let lastPage = data.length < 8 ? 0 : page * 8 - data.length;
      let start = data.length < 8 ? 0 : data.length - lastPage;
      for (let index = start; index < data.length; index++) {
        returnData.push(newData[index]);
      }
      return res.send({ success: true, MaxPage, returnData });
      //
    } else if (data.length > 0) {
      console.log(data.length);
      let end = data.length < page * 8 + 8 ? data.length : page * 8 + 8;
      for (let index = page * 8; index < end; index++) {
        returnData.push(newData[index]);
      }
      return res.send({
        success: true,
        MaxPage,
        returnData,
      });
    } else {
      return res.send({
        success: false,
        MaxPage,
        returnData: [{ data: null }],
      });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

module.exports = DogRead;
