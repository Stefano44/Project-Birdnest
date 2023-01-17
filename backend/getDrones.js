const axios = require('axios');
const xml2js = require('xml2js');

async function getDrones() {
  try {
    const response = await axios.get('http://assignments.reaktor.com/birdnest/drones');
    const xml = response.data;
    const parser = new xml2js.Parser();
    let drones;

    parser.parseString(xml, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      drones = result.report.capture[0].drone;
    });

    const violations = [];

    for (const drone of drones) {
      const distance = parseInt(Math.sqrt(Math.pow(drone.positionX[0] - 250000, 2) + Math.pow(drone.positionX[0] - 250000, 2)) / 1000)
      if (distance < 100) {
        violations.push({
          serialNumber: drone.serialNumber[0],
          distance: distance,
        });
        console.log('Serial number:', drone.serialNumber[0]);
      }
    }

    return violations;
  } catch (error) {
    console.error(error);
  }
}

module.exports = getDrones;