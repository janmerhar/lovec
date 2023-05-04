const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient

require("dotenv").config()

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
    .then((client) => {
      console.log("Connected to MongoDB")
      callback(client)
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
}

module.exports = mongoConnect
