const mongoose = require("mongoose")
const { Schema } = mongoose

const koordinataSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
})

module.exports = koordinataSchema
