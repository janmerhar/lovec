const Dnevnik = require("../models/dnevnik")

//
// Mentor
//

// Dnevnik za dnevnike prirpavnikov za nekega mentorja za neki dan
exports.getDnevnikPripravniki = async (req, res, next) => {
  console.log("getUser")
  res.send("getUser")
}

exports.patchSpremeniStatus = async (req, res, next) => {
  console.log("getUser")
  res.send("getUser")
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
