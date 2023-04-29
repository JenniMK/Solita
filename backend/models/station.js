const mongoose = require('mongoose')

const stationSchema = new mongoose.Schema({
  FID: { type: Number, required: true },
  ID: { type: Number, required: true },
  Nimi: { type: String, required: true },
  Namn: { type: String, required: false },
  Name: { type: String, required: false },
  Osoite: { type: String, required: false },
  Adress: { type: String, required: false },
  Kaupunki: { type: String, required: false },
  Stad: { type: String, required: false },
  Operaattor: { type: String, required: false },
  Kapasiteet: { type: Number, required: false },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  journeyStart: { type: Number, default: 0 },
  journeyEnd: { type: Number, default: 0 },
})

stationSchema.index({ ID: 1, Nimi: 1, x: 1, y: 1 })

stationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Station', stationSchema)