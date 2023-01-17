const mongoose = require('mongoose')
const ttl = require('mongoose-ttl')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })



const pilotSchema = new mongoose.Schema({
    pilotId: String,
    name: String,
    phone: String,
    email: String,
    distance: Number,
    last_seen: { type: Date, default: Date.now, index: { expires: 600 } }
})

pilotSchema.plugin(ttl, { ttl: '10m' });


pilotSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Pilot = mongoose.model("Pilot", pilotSchema)


module.exports = Pilot