const csv = require('csvtojson');
const Station = require('../models/station');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const fileName = './bike_stations.csv'; // Replace with the path to your CSV file


async function importData() {
  console.log('Starting import');
  
  try {
    await mongoose.connect("mongodb+srv://jennikuvaja:solitafullstack@cluster0.sff1l4d.mongodb.net/Citybikes?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database.');
  } catch (error) {
    console.log('Failed to connect to the database:', error.message);
    process.exit(1);
  }

  let stations;
  try {
    stations = await csv().fromFile(fileName);
  } catch (error) {
    console.log('Error reading CSV file:', error.message);
  }

  if (!stations) {
    console.log('No stations data found in the CSV file.');
    await mongoose.connection.close();
    return;
  }

  const importStation = async (stationData) => {
    try {
      const station = new Station(stationData);
      await station.save();
      console.log(`Imported station: ${stationData.ID} - ${stationData.Nimi}`);
    } catch (error) {
      console.log(`Error importing station ${stationData.ID}: ${error.message}`);
    }
  };

  for (const stationData of stations) {
    await importStation(stationData);
  }

  console.log('Import finished.');
  await mongoose.connection.close();
}
importData();