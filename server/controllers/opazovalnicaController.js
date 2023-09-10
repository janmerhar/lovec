const Opazovalnica = require("../entities/Opazovalnica")

const UporabnikFactory = require("../entities/UserRoles/UporabnikFactory")

const ResponseBuilder = require("../util/ResponseBuilder")

// Vrnem vse podatke o neki opazovalnici
// mogoce se samo omejim na dolocen casovni razpon obiskov
exports.getOpazovalnica = async (req, res, next) => {
  const { id } = req.params

  // await Opazovalnica.fetchOpazovalnica(id)
  console.log("getUser")
  res.send("getUser")
}

// Vrnem samo koordinate vseh opazovalnic
exports.getOpazovalnice = async (req, res, next) => {
  try {
    const result = await Opazovalnica.fetchOpazovalnice()

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next(error)
  }
}

// Vas verjetno ne potrebujem, saj lahko samo (ponovno) fetcham opazovalnice
// raje vas obdzim, saj bi drugace vsakic fetchal vse opazovalnice skupaj z vsemi obiski

// v bistvu lahko vas uporabim za dnevni pregled zasedenosti opazovalnic
// torej zgodovino in prihodnost
exports.getObiski = async (req, res, next) => {
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

// TODO !!!
exports.odpovejRezervacijo = async (req, res, next) => {}
exports.zasediOpazovalnico = async (req, res, next) => {}
