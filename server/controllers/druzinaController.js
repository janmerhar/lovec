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

exports.getDruzine = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await Druzina.fetchDruzine()

    res.send(result)
  } catch (err) {
    next(err)
  }
}
