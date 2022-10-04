// mongoose for intract with MongoDB 
const mongoose = require('mongoose');
// Database cluster Link
const DB = 'mongodb+srv://sarhank44:sarhank8299@sarhancluster.fxjt3wn.mongodb.net/VehicleDB';

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => {
    console.log("DB connection successfully");
}).catch((err) => {
    console.log("Not connected to Mongoose server" + err.message);
})

