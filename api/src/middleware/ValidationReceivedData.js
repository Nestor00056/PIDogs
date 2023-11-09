const ValidationData = async (req, res, next) => {
  if (
    !req.body?.name ||
    !req.body?.image ||
    !req.body?.weight ||
    !req.body?.height ||
    !req.body?.life_span
  ) {
    return res.send({
      success: false,
      message: "todos los campos deben de estar completos",
    });
  } else {
    next();
  }
};

module.exports = ValidationData;
