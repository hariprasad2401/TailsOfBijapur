const mongoose = require('mongoose')

const adoptionSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    vaccinated: String,
    location: { type: String, required: true },
    phone: { type: String, required: true },
    description: String,
    image: String,
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true })

module.exports = mongoose.model('Adoption', adoptionSchema)