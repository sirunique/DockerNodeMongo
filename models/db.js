const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://mongo:27017/EmployeeList', 
    // 'mongodb://localhost:27017/EmployeeList', 
    {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        return console.log('MongoDB Connection Succeeded..');

    } else {
        return console.log('Error In DB Connection..' + err);
    }
});

require('./employee.model')