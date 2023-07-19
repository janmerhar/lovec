const UporabnikFactory = require("../entities/UserRoles/UporabnikFactory")
const ResponseBuilder = require("../util/ResponseBuilder")

exports.postLogin = async (req, res, next) => {
  try {
    const { email, geslo } = req.body

    const result = await UporabnikFactory.login(email, geslo)

    if (result === null) {
      res.send(
        ResponseBuilder.unauthorized("Napačno uporabniško ime ali geslo")
      )
      return
    } else {
      res.send(ResponseBuilder.success(result))
      return
    }
  } catch (err) {
    next(err)
  }
}

exports.postRegister = async (req, res, next) => {
  try {
    const { ime, priimek, slika, rojstniDatum, email, geslo } = req.body

    const result = await UporabnikFactory.register(
      ime,
      priimek,
      slika,
      rojstniDatum,
      email,
      geslo
    )

    res.send(ResponseBuilder.success("Registracija uspešna"))
  } catch (err) {
    next(err)
  }
}

exports.getUporabnik = async (req, res, next) => {
  try {
    const { id: uporabnikId } = req.params

    const result = await UporabnikFactory.fetchUporabnik(uporabnikId)

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}

exports.refreshToken = async (req, res, next) => {
  console.log("refreshToken")
  res.send("refreshToken")
}
