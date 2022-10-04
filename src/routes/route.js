const express = require('express');
const Router = express.Router();
const vehicle = require('../controller/vehicleController')
const violation = require('../controller/violationController')
const limiter = require('../middleware/rateLimit')


//=====( Routes for Vehicles )
Router.post('/vehicle',limiter, vehicle.createVehicle)
Router.get('/vehicle',limiter, vehicle.getAllData)
Router.get('/vehicle/:licensePlateNumber',limiter, vehicle.getVehicleData)
Router.patch('/vehicle/:licensePlateNumber',limiter, vehicle.updateVehicleData)
Router.delete('/vehicle/:licensePlateNumber',limiter, vehicle.deleteVehicleData)

//=====( Routes for Violation )
Router.post('/violation',limiter, violation.newViolation)
Router.get('/violation',limiter, violation.getAllData)
Router.get('/violation/:licensePlateNumber',limiter, violation.getViolationData)
Router.patch('/violation/:licensePlateNumber',limiter, violation.updateViolationData)
Router.delete('/violation/:licensePlateNumber',limiter, violation.deleteViolationData)

module.exports = Router