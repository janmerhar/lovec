// Importing required modules
import express, { Express, Request, Response, Application } from "express"
import cors from "cors"

import bodyParser from "body-parser"
import mongoose from "mongoose"

import httpLogger from "@utils/httpLogger"
import https from "https"
import ErrorHandler from "@utils/ErrorHandler"

const { readFileSync } = require("fs")

// parse env variables
import dotenv from "dotenv"
dotenv.config()

// Configuring port
const port = process.env.PORT || 9000

const app = express()

// Configure middlewares
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
)
app.use(express.json())
app.use(httpLogger)

app.set("view engine", "html")

app.use(bodyParser.urlencoded({ extended: true }))

// Static folder
app.use(express.static(__dirname + "/views/"))

// Defining route middleware
app.use("/", require("@routes/authRoutes"))
app.use("/druzine", require("@routes/druzinaRoutes"))
app.use("/opazovalnice", require("@routes/opazovalnicaRoutes"))
app.use("/oprema", require("@routes/opremaRoutes"))
app.use("/dnevniki", require("@routes/dnevnikRoutes"))
app.use("/revirji", require("@routes/revirRoutes"))
app.use("/uporabnik", require("@routes/uporabnikRoutes"))
app.use("/vpleni", require("@routes/vplenRoutes"))

// Not found
app.use((_req, res, _next) => {
  res.status(404).json({ message: "Not found" })
})

app.use(ErrorHandler)

const key = readFileSync("./certs/priv_and_pub.key")
const cert = readFileSync("./certs/CA.crt")

const options = {
  key,
  cert,
}

mongoose
  .connect(process.env.MONGO_URI as string)
  .then((_result: any) => {
    https.createServer(options, app).listen(port, () => {
      console.log(`https://192.168.64.109:${port}/api`)
    })
  })
  .catch((err: any) => {
    console.log(err)
  })

export = app
