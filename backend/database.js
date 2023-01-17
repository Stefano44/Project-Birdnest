const mongoose = require('mongoose');
const Pilot = require('./models/pilot');

const savePilot = async (pilot) => {
  try {
    const newPilot = new Pilot(pilot);
    await newPilot.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports = savePilot;