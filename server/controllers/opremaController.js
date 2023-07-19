const Oprema = require("../entities/Oprema")
const UporabnikFactory = require("../entities/UserRoles/UporabnikFactory")
const ResponseBuilder = require("../util/ResponseBuilder")

exports.postOprema = async (req, res, next) => {
  try {
    const { uporabnikId } = await UporabnikFactory.JWTpayload(req)
    const { naziv, tip, stanje } = req.body

    const result = await Oprema.vnesiOprema(uporabnikId, naziv, tip, stanje)

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}

exports.deleteOprema = async (req, res, next) => {
  try {
    const { uporabnikId } = await UporabnikFactory.JWTpayload(req)
    const { id } = req.body

    const result = await Oprema.izbrisiOprema(uporabnikId, id)

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}

exports.getOprema = async (req, res, next) => {
  try {
    const { uporabnikId } = await UporabnikFactory.JWTpayload(req)

    const result = await Oprema.fetchUporabnikOprema(uporabnikId)

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}
