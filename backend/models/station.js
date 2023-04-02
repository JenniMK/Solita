const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

  const stationSchema = new mongoose.Schema({
    FID: Number,
    ID: Number,
    Nimi: String,
    Namn: String,
    Osoite: String,
    Adress: String,
    Kaupunki: String,
    Stad: String,
    Operaattor: String,
    Kapasiteet: Number,
    x: String,
    y: String
  })

  stationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Station', stationSchema)