// Importing required modules
import { createExpressServer } from "routing-controllers"
import mongoose from "mongoose"

import httpLogger from "@utils/httpLogger"
import ErrorHandler from "@utils/ErrorHandler"

// parse env variables
import dotenv from "dotenv"
dotenv.config()

// Configuring port
const port = process.env.PORT || 9000

import path from "path"

const app = createExpressServer({
  cors: {
    origin: "*",
    methods: "GET,PUT,PATCH,POST,DELETE",
  },
  classTransformer: true,
  controllers: [path.join(__dirname, "/controllers/*.ts")],
})

import * as express from "express"
app.use(
  `/${process.env.FILE_UPLOAD_PATH}`,
  express.static(process.cwd() + `/${process.env.FILE_UPLOAD_PATH}`)
)

app.use(express.static(path.join(__dirname, "public")))

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))

app.use(httpLogger)
app.use(ErrorHandler)

import SistemskeSpremenljivke from "@entities/SistemskeSpremenljivke"
import { NextFunction } from "express"

// Nastavljanje sistemskih spremenljivk
SistemskeSpremenljivke.createInstance().then((spremenljivke) => {
  app.set("spremenljivke", spremenljivke)
})

// TODO: implement better solution
// Not found
app.use((_req: Request, res: Response, _next: NextFunction) => {
  // @ts-ignore
  if (!res.headersSent) res.status(404).json({ message: "route not found" })
})

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
