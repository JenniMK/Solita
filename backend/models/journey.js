const mongoose = require('mongoose');

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

journeySchema.index({ "Departure station id": 1, "Departure station name": 1, "Return station id": 1, "Return station name": 1, "Covered distance (m)": 1, "Duration_sec": 1 });

journeySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

module.exports = mongoose.model('Journey', journeySchema);
