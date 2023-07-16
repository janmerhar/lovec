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
  console.log("getUser")
  res.send("getUser")
}

exports.postDnevnikVnesi = async (req, res, next) => {
  console.log("getUser")
  res.send("getUser")
}
