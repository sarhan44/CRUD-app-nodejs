const vehicleModel = require('../models/vehicleModel')

// validation for enum values
const isvalidType = function (fuelType) {
    return ['petrol', 'desiel', 'electric'].indexOf(fuelType) === -1
}
const isvalidStatus = function (rc_status) {
    return ['active', 'inactive'].indexOf(rc_status) === -1
}

// ===========[ Create Vehicle Data ]===========

const createVehicle = async (req, res) => {
    try {
        let data = req.body

        let { licensePlateNumber, manufacturerName, model, fuelType, ownerName, rc_status, vehicleColor, registrationDate, insuranceUpto, fitnessUpto, roadTaxUpto } = data

        //==[ Required fields ]
        if (!licensePlateNumber) return res.status(400).send({ messages: 'Please enter license plate number' })
        if (!manufacturerName) return res.status(400).send({ messages: 'Please enter manufacturer name' })
        if (!model) return res.status(400).send({ messages: 'Please enter model' })
        if (!fuelType) return res.status(400).send({ messages: 'Please enter fuelType' })
        if (!ownerName) return res.status(400).send({ messages: 'Please enter owner name' })
        if (!rc_status) return res.status(400).send({ messages: 'Please enter rc_status' })
        if (!vehicleColor) return res.status(400).send({ messages: 'Please enter vehicle Color' })
        if (!registrationDate) return res.status(400).send({ messages: 'Please enter registration Date' })
        if (!insuranceUpto) return res.status(400).send({ messages: 'Please enter insurance date' })
        if (!fitnessUpto) return res.status(400).send({ messages: 'Please enter fitness date' })
        if (!roadTaxUpto) return res.status(400).send({ messages: 'Please enter roadTax date' })

        //check if fuelType shuld only be petrol, deisel, electric
        if (isvalidType(fuelType)) {
            return res.status(400).send({ status: false, message: "fuelType must be petrol, desiel, electric" })
        }
        //check if fuelType shuld only be active or inactive
        if (isvalidStatus(rc_status)) {
            return res.status(400).send({ status: false, message: "rc_status must be active or inactive" })
        }
        // check license number in DB to avoid duplicates
        let findLicensePNum = await vehicleModel.findOne({ licensePlateNumber: licensePlateNumber })
        if (findLicensePNum) return res.status(400).send({ messages: 'license plate number is already in use' })

        // create document
        let create = await vehicleModel.create(req.body)

        // send response
        return res.status(201).send({ message: 'Vehicle created successfully', data: create })

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

// ===========[ Get All Vehicle Data ]===========

const getAllData = async (req, res) => {
    try {
        //find data in database
        let getData = await vehicleModel.find()

        // if not found, send error message.
        if (getData.length == 0) return res.status(404).send({ messages: 'No data found!.' });

        //if found, send all data in response
        return res.status(200).send({ message: 'All Vehicles List', Data: getData })

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

// ===========[ Get Vehicle Data by Id ]===========

const getVehicleData = async (req, res) => {
    try {
        //get licensePlateNumber in params
        let licensePlateNumber = req.params.licensePlateNumber;

        // find document with licensePlateNumber
        let getData = await vehicleModel.findOne({ licensePlateNumber: licensePlateNumber });

        // if not found, send error message.
        if (!getData) return res.status(404).send({ messages: 'Not Found!.' });

        //if found, send all data in response
        return res.status(200).send({ Data: getData })

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

// ===========[ Update Vehicle Data by Id ]===========

const updateVehicleData = async (req, res) => {
    try {
        //get licensePlateNumber from params & data to update
        let licensePlateNumber = req.params.licensePlateNumber;
        let data = req.body

        //find document in DB and update 
        let findData = await vehicleModel.findOneAndUpdate({ licensePlateNumber: licensePlateNumber }, { $set: data }, { new: true });

        // if not found, send error message.
        if (!findData) return res.status(404).send({ messages: 'Not Found!.' });

        //send Update data in response
        return res.status(200).send({ Data: findData })

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

// ===========[ Delete Vehicle Data by Id ]===========

const deleteVehicleData = async (req, res) => {
    try {
        //get licensePlateNumber from params
        let licensePlateNumber = req.params.licensePlateNumber;

        // find document in DB and delete
        let findData = await vehicleModel.findOneAndDelete({ licensePlateNumber: licensePlateNumber });

        // if not found or deleted, send error message.
        if (!findData) return res.status(404).send({ messages: 'Not Found!.' });

        //send response
        return res.status(200).send({ Data: "Vehicle Data successfully deleted." });

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}



//=====( exports )=====
module.exports.createVehicle = createVehicle
module.exports.getAllData = getAllData
module.exports.getVehicleData = getVehicleData
module.exports.updateVehicleData = updateVehicleData
module.exports.deleteVehicleData = deleteVehicleData
