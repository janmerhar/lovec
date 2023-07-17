const Vplen = require("../entities/Vplen")
const UporabnikFactory = require("../entities/UserRoles/UporabnikFactory")

// Tukaj imam infinite scroll, ki mi vraca po zadnjih n vplenov
exports.getVpleni = async (req, res, next) => {
  try {
    const { uporabnikId } = await UporabnikFactory.JWTpayload(req)
    const { stran } = req.params

    const result = await Vplen.fetchVpleni(uporabnikId, stran)

    res.send(result)
  } catch (error) {
    next(error)
  }
}

// Tukaj dobim samo podatke o vseh vplenih za nek dan
exports.getVplen = async (req, res, next) => {
  try {
    const { uporabnikId } = await UporabnikFactory.JWTpayload(req)
    const { datum } = req.params

    const result = await Vplen.fetchVpleniDatum(uporabnikId, datum)

    res.send(result)
  } catch (error) {
    next(error)
  }
}

exports.postVplen = async (req, res, next) => {
  try {
    const { zival, teza, datum, bolezni } = req.body
    const { uporabnikId } = await UporabnikFactory.JWTpayload(req)

    const result = await Vplen.vnesiVplen(
      uporabnikId,
      zival,
      teza,
      datum,
      bolezni
    )

    res.send(result)
  } catch (error) {
    next(error)
  }
}
