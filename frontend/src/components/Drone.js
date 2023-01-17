const Drone = ({pilot}) => {
  
    const lastSeen = new Date(pilot.last_seen).toLocaleTimeString();
  
    const droneStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      paddingRight: 2,
      border: 'solid',
      borderWidth: 2,
      margingBottom: 5,
    }
  
    return (
      <div style={droneStyle}>
        <p><b>Pilot id:</b> {pilot.pilotId}&ensp;<b>Closest distance: </b> {pilot.distance} meters&ensp;<b>Last seen: </b> {lastSeen}</p>
        <p><b>Name: </b> {pilot.name}&ensp;<b>Email: </b> {pilot.email}&ensp; <b>Phone:</b> {pilot.phone}</p>
      </div>
    )
  }
  
  export default Drone