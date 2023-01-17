const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)
const Pilot = require('../models/pilot')
const  { updatePilot } = require('../routes/pilots')

const initialPilots = [
    {
        pilotId: "T35T",
        name: "Test Man",
        phone: "+210018540241",
        email: "testg@example.com",
        distance: 23,
        last_seen: Date.now() - (5 * 60 * 1000)
    },
    {
        pilotId: "A123456",
        name: "Test Test",
        phone: "25215525",
        email: "test2g@example.com",
        distance: 11,
        last_seen: Date.now() - (5 * 60 * 1000)
    },
  ]
  
  beforeEach(async () => {
    await Pilot.deleteMany({})
    let pilotObject = new Pilot(initialPilots[0])
    await pilotObject.save()
    pilotObject = new Pilot(initialPilots[1])
    await pilotObject.save()
  })

test('pilots are returned as json', async () => {
  await api
    .get('/pilots')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all pilots are returned', async () => {
    const response = await api.get('/pilots')
  
    expect(response.body).toHaveLength(initialPilots.length)
  })

test('existing pilot with new bigger distance wont be updated', async () => {
    testPilot = {
        pilotId: "T35T",
        name: "Test Man",
        phone: "+210018540241",
        email: "testg@example.com",
        distance: 35,
        last_seen: Date.now()
    }

    updatePilot(testPilot, initialPilots[0])
    const response = await api.get('/pilots')
    expect(response.body).toHaveLength(2)
    expect(response.body[0].distance).toBe(23)


})

test('existing pilot with new smaller distance updated', async () => {
    testPilot = {
        pilotId: "T35T",
        name: "Test Man",
        phone: "+210018540241",
        email: "testg@example.com",
        distance: 21,
        last_seen: Date.now()
    }

    updatePilot(testPilot, initialPilots[0])
    const response = await api.get('/pilots')
    expect(response.body).toHaveLength(2)
    console.log(response.body[0].distance)
    expect(response.body[0].distance).toBe(21)


})

afterAll(() => {
  mongoose.connection.close()
})