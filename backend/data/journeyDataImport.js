const csv = require('csvtojson');
const Journey = require('../models/journey');
const connectDatabase = require('../database');
const mongoose = require('mongoose');

const fileNames = ['/2021-05.csv', '/2021-06.csv', '/2021-07.csv'];

async function importData() {
  try {
    await connectDatabase();

    for (const fileName of fileNames) {
      const journeyArray = await csv({
        trim: true,
      }).fromFile(fileName);

      const limitedArray = journeyArray.slice(0, 500000);

      const filteredArray = limitedArray.filter((journey) => {
        return !(journey['Duration_sec'] < 10 || journey['Covered distance (m)'] < 10);
      });

      await Journey.insertMany(filteredArray);
      console.log(`Data imported successfully from ${fileName}!`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  }
}

importData();

