const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    licensePlateNumber: { type: String,unique:true, required: true },

    manufacturerName: { type: String, required: true },

    model: { type: String, required: true },

    fuelType: { type: String, required: true, enum: ['petrol', 'desiel', 'electric'] },

    ownerName: { type: String, required: true, },

    rc_status: { type: String, required: true, enum: ['active', 'inactive'] },

    vehicleColor: { type: String, required: true, },

    registrationDate: { type: String, required: true, },

    insuranceUpto: { type: String, required: true, },

    fitnessUpto: { type: String, required: true, },

    roadTaxUpto: { type: String, required: true, }
})

module.exports = mongoose.model('Vehicle', vehicleSchema)