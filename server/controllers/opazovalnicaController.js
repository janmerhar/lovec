const Opazovalnica = require("../entities/Opazovalnica")

const UporabnikFactory = require("../entities/UserRoles/UporabnikFactory")

const ResponseBuilder = require("../util/ResponseBuilder")

// Vrnem vse podatke o neki opazovalnici
// mogoce se samo omejim na dolocen casovni razpon obiskov
exports.getOpazovalnica = (req, res, next) => {
  console.log("getUser")
  res.send("getUser")
}

// Vrnem samo koordinate vseh opazovalnic
exports.getOpazovalnice = (req, res, next) => {
  console.log("getUser")
  res.send("getUser")
}

// Vas verjetno ne potrebujem, saj lahko samo (ponovno) fetcham opazovalnice
exports.getObiski = (req, res, next) => {
  console.log("getUser")
  res.send("getUser")
}

exports.postRezerviraj = async (req, res, next) => {
  try {
    const { uporabnikId } = await UporabnikFactory.JWTpayload(req)
    const { id } = req.params

    const { zacetek, konec } = req.body

    const result = await Opazovalnica.rezervirajOpazovalnico(
      uporabnikId,
      id,
      zacetek,
      konec
    )

    res.send(ResponseBuilder.success(result))
    // res.send("rezervacija")
  } catch (error) {
    next(error)
  }
}

