const Dnevnik = require("../entities/Dnevnik")

const UporabnikFactory = require("../entities/UserRoles/UporabnikFactory")

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

    if (role !== "mentor") {
      throw new Error("Uporabnik nima pravic za dostop do te strani")
    }

    const result = await Dnevnik.fetchDnevnikiMentor(mentorId, datum)

    res.send(result)
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

    if (role !== "mentor") {
      throw new Error("Uporabnik nima pravic za dostop do te strani")
    }

    const result = await Dnevnik.spremeniStatusDnevnik(
      mentorId,
      dnevnikId,
      status
    )

    res.send(result)
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
      throw new Error("Uporabnik nima pravic za dostop do te strani")
    }

    const result = await Dnevnik.fetchDnevnikiPripravnik(pripravnikId, stran)
    res.send(result)
  } catch (error) {
    next("Prišlo je do napake pri pridobivanju dnevnika pripravnika")
  }
}

exports.postDnevnikVnesi = async (req, res, next) => {
  // Dobim iz zahteve
  const { datum, ure, opis, delo } = req.body

  try {
    const { uporabnikId: pripravnikId, role } =
      await UporabnikFactory.JWTpayload(req)

    if (role !== "pripravnik") {
      throw new Error("Uporabnik nima pravic za dostop do te strani")
    }

    // Dobim iz PB glede na uporabnikId
    const mentorId = "643e993545960e569b99ab64"

    const result = await Dnevnik.vnesiDnevnik(
      pripravnikId,
      mentorId,
      datum,
      ure,
      opis,
      delo
    )

    res.send(result)
  } catch (error) {
    next("Prišlo je do napake pri vnašanju dnevnika")
  }
}
