const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const journeySchema = new mongoose.Schema({
  Departure: Date,
  Return: Date,
  "Departure station id": Number,
  "Departure station name": String,
  "Return station id": Number,
  "Return station name": String,
  "Covered distance (m)": Number,
  "Duration_sec": Number
});

journeySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
  module.exports = mongoose.model('Journey', journeySchema);