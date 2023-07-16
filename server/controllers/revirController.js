const Revir = require("../entities/Revir")

exports.getRevirji = async (req, res, next) => {
  try {
    const result = await Revir.fetchRevirji()

    res.send(result)
  } catch (error) {
    next(error)
  }
}
