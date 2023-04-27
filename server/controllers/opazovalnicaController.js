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
