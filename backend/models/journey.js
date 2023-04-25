const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  Departure: Date,
  Return: Date,
  "Departure station id": { type: Number, required: true },
  "Departure station name": { type: String, required: true },
  "Return station id": { type: Number, required: true },
  "Return station name": { type: String, required: true },
  "Covered distance (m)": { type: Number, required: true },
  "Duration_sec": { type: Number, required: true }
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
