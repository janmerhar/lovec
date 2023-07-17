const DruzinaModel = require("../models/druzina")
const Druzina = require("../entities/Druzina")

exports.postDruzina = async (req, res, next) => {
  try {
    const { ime } = req.body

    const druzina = new DruzinaModel({ ime, revirji: [], clani: [] })
    const result = await druzina.save()

    res.send(result)
  } catch (err) {
    next(err)
}
}

exports.getClani = (req, res, next) => {
  console.log("getUser")
  res.send("getUser")
}
