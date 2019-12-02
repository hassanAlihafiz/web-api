const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const student=require('./routes/student');
const gas=require('./routes/gas');
const empAttendence=require('./routes/employeeAttendence');
const statcharges=require('./routes/stationaryCharges');
const accountstat=require('./routes/AccountStatement');
const campuse=require('./routes/campuses');


app.use(bodyParser.json(),cors());

app.use('/student',student);
app.use('/gas',gas);
app.use('/empAttend',empAttendence);
app.use('/stationary',statcharges);
app.use('/accountStatement',accountstat);
app.use('/campuses',campuse);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 3000);
    res.json({
        error: {
            message: error.message
        }
    })

});


module.exports = app;