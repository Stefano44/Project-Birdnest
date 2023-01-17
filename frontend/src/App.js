import { useState, useEffect } from 'react'
import axios from 'axios'
import Drone from './components/Drone'



const App = () => {
  const [pilots, setPilots] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('/drones');
      const pilotsResponse = await axios.get('/pilots');
      const newPilots = pilotsResponse.data.filter(pilot => !pilots.find(p => p.pilotId === pilot.pilotId));
      
      const updatedPilots = pilotsResponse.data.filter(pilot => pilots.find(p => p.pilotId === pilot.pilotId));
      
      updatedPilots.forEach(pilot => {
        const existingPilot = pilots.find(p => p.pilotId === pilot.pilotId);
        if (existingPilot.distance !== pilot.distance) {
          existingPilot.distance = pilot.distance;
        }
      });
      
      setPilots([...pilots, ...newPilots]);
    }
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div>
      <h1>PROJECT BIRDNEST</h1>
      <h2>List of all the pilots who recently violated 100 meters No Drone Zone of the Monadikuikka nest </h2>
      <p>There have been {pilots.length} violations in the last 10 minutes</p>
      {pilots.map(pilot =>
         <Drone pilot={pilot}/>
        )}
    </div>
  )
}

export default App
