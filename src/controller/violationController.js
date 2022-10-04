const violationModel = require('../models/violationModel')

//enum values validation function
const isvalidStatus = function (status) {
    return ['paid', 'unpaid'].indexOf(status) === -1
}

// ===========[ New Violation ]=============

const newViolation = async (req, res) => {
    try {
        let data = req.body
        //destructure data
        let { licensePlateNumber, violationType, status, date, time, location, videoUrl} = data

        //==[ Required fields ]====
        if (!licensePlateNumber) return res.status(400).send({ messages: 'Please enter license plate number' })
        if (!violationType) return res.status(400).send({ messages: 'Please enter violationType' })
        if (!status) return res.status(400).send({ messages: 'Please enter status' })
        if (!date) return res.status(400).send({ messages: 'Please enter date' })
        if (!time) return res.status(400).send({ messages: 'Please enter time' })
        if (!location) return res.status(400).send({ messages: 'Please enter location' })
        if (!videoUrl) return res.status(400).send({ messages: 'Please enter videoUrl' })

        //check if fuelType shuld only be active or inactive
        if (isvalidStatus(status)) {
            return res.status(400).send({ status: false, message: "status must be paid or unpaid" })
        }

        // create document
        let create = await violationModel.create(req.body)

        // send response
        return res.status(201).send({ message: 'Violation created successfully', data: create })

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}


// ===========[ Get All Vehicle Data ]===========

const getAllData = async (req, res) => {
    try {
        //find data in database
        let getData = await violationModel.find()

        // if not found, send error message.
        if (getData.length == 0) return res.status(404).send({ messages: 'No data found!.' });

        //if found, send all data in response
        return res.status(200).send({ message: 'All violation List', Data: getData })

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}


// ===========[ Get Vehicle Data by Id ]===========

const getViolationData = async (req, res) => {
    try {
        //get licensePlateNumber in params
        let licensePlateNumber = req.params.licensePlateNumber;

        // find document with licensePlateNumber
        let getData = await violationModel.findOne({ licensePlateNumber: licensePlateNumber });

        // if not found, send error message.
        if (!getData) return res.status(404).send({ messages: 'Not Found!.' });

        //if found, send all data in response
        return res.status(200).send({ Data: getData })

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

// ===========[ Update Vehicle Data by Id ]===========

const updateViolationData = async (req, res) => {
    try {
        //get licensePlateNumber from params & data to update
        let licensePlateNumber = req.params.licensePlateNumber;
        let data = req.body

        //find document in DB and update 
        let findData = await violationModel.findOneAndUpdate({ licensePlateNumber: licensePlateNumber }, { $set: data }, { new: true });

        // if not found, send error message.
        if (!findData) return res.status(404).send({ messages: 'Not Found!.' });

        //send Update data in response
        return res.status(200).send({ Data: findData })

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

// ===========[ Delete Vehicle Data by Id ]===========

const deleteViolationData = async (req, res) => {
    try {
        //get licensePlateNumber from params
        let licensePlateNumber = req.params.licensePlateNumber;

        // find document in DB and delete
        let findData = await violationModel.findOneAndDelete({ licensePlateNumber: licensePlateNumber });

        // if not found or deleted, send error message.
        if (!findData) return res.status(404).send({ messages: 'Not Found!.' });

        //send response
        return res.status(200).send({ Data: "Vehicle Data successfully deleted." });

    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}


//====( Exports )========
module.exports.newViolation = newViolation
module.exports.getAllData = getAllData
module.exports.getViolationData = getViolationData
module.exports.updateViolationData = updateViolationData
module.exports.deleteViolationData = deleteViolationData