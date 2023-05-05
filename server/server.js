// Importing required modules
const cors = require("cors")
const express = require("express")

const { mongoConnect } = require("./util/database")
const mongoose = require("mongoose")

// parse env variables
require("dotenv").config()

// Configuring port
const port = process.env.PORT || 9000

const app = express()

// Configure middlewares
app.use(cors())
app.use(express.json())

app.set("view engine", "html")

// Static folder
app.use(express.static(__dirname + "/views/"))

// Defining route middleware
app.use("/api", require("./routes/api"))
app.use("/", require("./routes/auth"))
app.use("/druzina", require("./routes/druzina"))
app.use("/opazovalnice", require("./routes/opazovalnica"))
app.use("/oprema", require("./routes/oprema"))
app.use("/pripravniki", require("./routes/pripravnik"))
app.use("/revirji", require("./routes/revir"))
app.use("/uporabnik", require("./routes/uporabnik"))

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
