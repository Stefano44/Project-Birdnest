const  { handlePilotResponse } = require('./pilots')

const axios = require('axios')
const xml2js = require('xml2js')

// get the list of drones from the url
function getDrones() {
  axios.get('http://assignments.reaktor.com/birdnest/drones')
    .then(handleDronesResponse)
    .catch(handleError)
}

// handle the response from the url and parse the xml
function handleDronesResponse(response) {
  xml2js.parseString(response.data, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      const drones = result.report.capture[0].drone
      // iterate and handle each drone
      drones.forEach(handleDrone)
    }
  })
}

// calculate the distance between the drone and the birdnest
function calculateDistance(x, y) {
  return parseInt(Math.sqrt(Math.pow(x - 250000, 2) + Math.pow(y - 250000, 2)) / 1000)
}

// handle each drone and get the serial number and x and y distance
function handleDrone(drone) {
  const serialNumber = drone.serialNumber[0]
  const x = drone.positionX[0]
  const y = drone.positionY[0]
  const distance = calculateDistance(x, y)
  // if the drone is within 100m of the birdnest, get the pilot information
  if (distance < 100) {
    axios.get(`http://assignments.reaktor.com/birdnest/pilots/${serialNumber}`)
      .then(response => handlePilotResponse(response, distance))
      .catch(handleError)
  }
}


function handleError(error) {
  if (error.response && error.response.status === 404) {
    console.log(`Error: ${error.response.status} - ${error.response.statusText}. Resource not found.`)
  } else {
    console.log(`Error: ${error.message}`)
  }
}


module.exports = getDrones