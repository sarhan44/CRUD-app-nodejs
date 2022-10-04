const express = require('express');
const bodyParser = require('body-parser');
const route = require("./routes/route.js");
const app = express();

require('./DB/connection')
// parse data into json format
app.use(bodyParser.json());

// routes
app.use('/', route)

//port
app.listen(3000, () => {
    console.log(`App is Running on port 3000`);
})