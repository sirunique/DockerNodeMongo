const mongoose = require('mongoose')

var employeeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: "This field is  required."
    },
    email: {
        type: String,
        required: "This field is  required."
    },
    gender: {
        type: String,
        required: "This field is  required."
    },
    mobile: {
        type: String,
        required: "This field is  required."
    },
    city: {
        type: String,
        required: "This field is  required."

    }
});

employeeSchema.path('email').validate((val) =>{
    emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val);
}, 'Invalid email');

mongoose.model('Employee', employeeSchema)