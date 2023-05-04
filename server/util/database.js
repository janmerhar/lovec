const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient

require("dotenv").config()

let _db

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
    .then((client) => {
      _db = client.db()
      callback()
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
}

const getDb = () => {
  if (_db) {
    return _db
  } else {
    throw "No database found!"
  }
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
