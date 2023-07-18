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
    const salt = await bcrypt.genSalt(10)
    const geslo_hash = await bcrypt.hash(req.body.geslo, salt)

    const uporabnik = new Uporabnik({
      uporabniskoIme: req.body.uporabniskoIme,
      ime: req.body.ime,
      priimek: req.body.priimek,
      slika: req.body.slika, // uredi default slika --> moram narediti picture upload
      rojstniDatum: new Date(req.body.rojstniDatum),
      email: req.body.email,
      geslo: geslo_hash,
      role: req.body.role,
      // mentor -> null
      // pripravniki -> []
      druzina: req.body.druzina,
    })

    const result = await uporabnik.save()

    console.log(result)
  } catch (err) {
    console.log(err)
  }

  res.send("postRegister")
}

exports.getUporabnik = async (req, res, next) => {
  console.log("getUser")
  res.send("getUser")
}

// Mogoce se sem dodam osvezevanje tokena
// mogoce pa tudi ne, ker je to bolj za beforeEnter stvar
