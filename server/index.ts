// Importing required modules
import express, { Express, Request, Response, Application } from "express"
import cors from "cors"

import bodyParser from "body-parser"
import mongoose from "mongoose"

import httpLogger from "@utils/httpLogger"
import https from "https"
import ErrorHandler from "@utils/ErrorHandler"

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
import druzina from "@routes/druzinaRoutes"
import opazovalnica from "@routes/opazovalnicaRoutes"
import oprema from "@routes/opremaRoutes"
import dnevnik from "@routes/dnevnikRoutes"
import revir from "@routes/revirRoutes"
import uporabnik from "@routes/uporabnikRoutes"
import vplen from "@routes/vplenRoutes"

app.use("/", druzina)
app.use("/druzine", druzina)
app.use("/opazovalnice", opazovalnica)
app.use("/oprema", oprema)
app.use("/dnevniki", dnevnik)
app.use("/revirji", revir)
app.use("/uporabnik", uporabnik)
app.use("/vpleni", vplen)

// Not found
app.use((_req, res, _next) => {
  res.status(404).json({ message: "Not found" })
})

app.use(ErrorHandler)

mongoose
  .connect(process.env.MONGO_URI as string)
  .then((_result: any) => {
    app.listen(port)
    console.log(`http://localhost:${port}/api`)
  })
  .catch((err: any) => {
    console.log(err)
  })

export = app
