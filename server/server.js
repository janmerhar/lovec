// Importing required modules
const cors = require("cors")
const express = require("express")

const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const httpLogger = require("./util/httpLogger")

const ErrorHandler = require("./util/ErrorHandler")
// parse env variables
require("dotenv").config()

// Configuring port
const port = process.env.PORT || 9000

const app = express()

// Configure middlewares
app.use(cors())
app.use(express.json())
app.use(httpLogger)

app.set("view engine", "html")

app.use(bodyParser.urlencoded({ extended: true }))

// Static folder
app.use(express.static(__dirname + "/views/"))

// Defining route middleware
app.use("/", require("./routes/authRoutes"))
app.use("/druzine", require("./routes/druzinaRoutes"))
app.use("/opazovalnice", require("./routes/opazovalnicaRoutes"))
app.use("/oprema", require("./routes/opremaRoutes"))
app.use("/dnevniki", require("./routes/dnevnikRoutes"))
app.use("/revirji", require("./routes/revirRoutes"))
app.use("/uporabnik", require("./routes/uporabnikRoutes"))
app.use("/vpleni", require("./routes/vplen"))

// Not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" })
})

app.use(ErrorHandler)

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(port)
    console.log(`http://localhost:${port}/api`)
  })
  .catch((err) => {
    console.log(err)
  })

module.exports = app
