const Oprema = require("../entities/Oprema")
const Uporabnik = require("../entities/UserRoles/Uporabnik")
const UporabnikFactory = require("../entities/UserRoles/UporabnikFactory")

exports.postOprema = async (req, res, next) => {
  try {
    const { uporabnikId } = await UporabnikFactory.JWTpayload(req)
    const { naziv, tip, stanje } = req.body

    const result = await Oprema.vnesiOprema(uporabnikId, naziv, tip, stanje)

    res.send(result)
  } catch (error) {
    next(error)
  }
}

exports.deleteOprema = async (req, res, next) => {
  console.log("getUser")
  res.send("getUser")
}

exports.getOprema = async (req, res, next) => {
  console.log("getUser")
  res.send("getUser")
}
