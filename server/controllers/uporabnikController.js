const UporabnikFactory = require("../entities/UserRoles/UporabnikFactory")

exports.postLogin = async (req, res, next) => {
  try {
    const { email, geslo } = req.body

    const result = await UporabnikFactory.login(email, geslo)

    if (result === null) {
      res.send("Nepravilni podatki")
    } else {
      res.send(result)
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

    console.log(result)
    res.send(result)
  } catch (err) {
    next(err)
  }
}

exports.getUporabnik = async (req, res, next) => {
  try {
    const { id: uporabnikId } = req.params

    const result = await UporabnikFactory.fetchUporabnik(uporabnikId)

    res.send(result)
  } catch (error) {
    next(error)
  }
}

// Mogoce se sem dodam osvezevanje tokena
// mogoce pa tudi ne, ker je to bolj za beforeEnter stvar
