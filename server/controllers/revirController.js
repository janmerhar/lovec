const Revir = require("../entities/Revir")
const ResponseBuilder = require("../util/ResponseBuilder")

exports.getRevirji = async (req, res, next) => {
  try {
    const result = await Revir.fetchRevirji()

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}
