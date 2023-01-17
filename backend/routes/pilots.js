const Pilot = require('../models/pilot')
// handle the response from the pilot url
async function handlePilotResponse(response, distance) {
  try {
    // create a new pilot object with the data from the response
    const pilot = {
      pilotId: response.data.pilotId,
      name: `${response.data.firstName} ${response.data.lastName}`,
      phone: response.data.phoneNumber,
      email: response.data.email,
      distance: distance,
    }
    // check if the pilot already exists in the database
    const existingPilot = await Pilot.findOne({ pilotId: pilot.pilotId })
    if (existingPilot) {
      await updatePilot(pilot, existingPilot)
    } else {
      // if the pilot doesn't exist, save it to the database
      await savePilot(pilot)
    }
  } catch (error) {
    console.log(error)
  }
}

// update the pilot data in the database
async function updatePilot(pilot, existingPilot) {
  if (pilot.distance < existingPilot.distance) {
    // Update the distance and last_seen fields if the new distance is smaller than the previous distance
    try {
      const updatedPilot = await Pilot.findOneAndUpdate({ pilotId: pilot.pilotId },
        { $set: { distance: pilot.distance, last_seen: new Date() } },{ upsert: true, new: true })
      console.log('Pilot data updated successfully')
    } catch (error){
      console.log(error)
    }
  } else {
    console.log('New distance is not smaller than the original distance, no update needed.')
  }
}

// create a new pilot document to the database
function savePilot(pilot) {
  const newPilot = new Pilot({ ...pilot, last_seen: new Date() })
  newPilot.save((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Pilot data saved successfully')
    }
  })
}

module.exports = { handlePilotResponse, updatePilot }