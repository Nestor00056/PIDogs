const ValidationDataUpdate = (req, res, next) => {
  try {
    console.log(req.body);
    if (!req.body.Data?.name && !req.body.newData?.name) {
      throw new Error("los campos no deben de estar vacios");
    }
    if (!req.body.data.weight && !req.body.newData.weight) {
      throw new Error("los campos no deben de estar vacios");
    }
    if (!req.body.data.height && !req.body.newData.height) {
      throw new Error("los campos no deben de estar vacios");
    }
    if (!req.body.data.life_span && !req.body.newData.life_span) {
      throw new Error("los campos no deben de estar vacios");
    }
    next();
  } catch (error) {
    res.send({ succes: false, error: error.message });
  }
};

module.exports = ValidationDataUpdate;
