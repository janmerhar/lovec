const Dnevnik = require("../entities/Dnevnik")

const UporabnikFactory = require("../entities/UserRoles/UporabnikFactory")

const ResponseBuilder = require("../util/ResponseBuilder")

//
// Mentor
//

// Dnevnik za dnevnike prirpavnikov za nekega mentorja za neki dan
exports.getDnevnikPripravniki = async (req, res, next) => {
  const { datum } = req.params

  try {
    const { uporabnikId: mentorId, role } = await UporabnikFactory.JWTpayload(
      req
    )

    if (role !== "lovec") {
      res.send(
        ResponseBuilder.unauthorized("Uporabnik nima pravic za to stran")
      )
      return
    }

    const result = await Dnevnik.fetchDnevnikiMentor(mentorId, datum)

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next("Prišlo je do napake pri pridobivanju dnevnika pripravnikov")
  }
}

exports.patchSpremeniStatus = async (req, res, next) => {
  const { dnevnikId, status } = req.body

  try {
    const { uporabnikId: mentorId, role } = await UporabnikFactory.JWTpayload(
      req
    )

    if (role !== "lovec") {
      res.send(
        ResponseBuilder.unauthorized("Uporabnik nima pravic za to operacijo")
      )
      return
    }

    const result = await Dnevnik.spremeniStatusDnevnik(
      mentorId,
      dnevnikId,
      status
    )

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next("Prišlo je do napake pri spreminjanju statusa dnevnika")
  }
}

//
// Pripravnik
//

// Vpogled v svoj dnenvik za pripravnika
// ta nima svojega dneva, temvec continuos scroll
exports.getDnevnikPripravnik = async (req, res, next) => {
  const { stran } = req.params

  try {
    const { uporabnikId: pripravnikId, role } =
      await UporabnikFactory.JWTpayload(req)

    if (role !== "pripravnik") {
      res.send(
        ResponseBuilder.unauthorized("Uporabnik nima pravic za to stran")
      )
      return
    }

    const result = await Dnevnik.fetchDnevnikiPripravnik(pripravnikId, stran)
    res.send(ResponseBuilder.success(result))
  } catch (error) {
    // next("Prišlo je do napake pri pridobivanju dnevnika pripravnika")
    next(error)
  }
}

exports.postDnevnikVnesi = async (req, res, next) => {
  // Dobim iz zahteve
  const { datum, ure, opis, delo } = req.body

  try {
    const { uporabnikId: pripravnikId, role } =
      await UporabnikFactory.JWTpayload(req)

    if (role == "pripravnik") {
      res.send(ResponseBuilder.unauthorized("Uporabnik nima pravic za to"))
      return
    }

    // Dobim iz PB glede na uporabnikId
    const { mentor: mentorId } = await UporabnikFactory.fetchUporabnik(
      pripravnikId
    )

    const result = await Dnevnik.vnesiDnevnik(
      pripravnikId,
      mentorId,
      datum,
      ure,
      opis,
      delo
    )

    res.send(ResponseBuilder.success(result))
  } catch (error) {
    next("Prišlo je do napake pri vnašanju dnevnika")
  }
}
