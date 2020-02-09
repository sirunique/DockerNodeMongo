const express = require('express')
var router = express.Router();
const mongoose = require('mongoose')
const Employee = mongoose.model('Employee')


router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});


//POST
router.post('/', (req, res) => {
    if (req.body._id == "")
        insertrecord(req, res)
    else
        updateRecord(req, res);
    // req.body._id == "" ? insertrecord(req, res) : updateRecord(req, res);
    // console.log(req.body)
})

//GET
router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render('employee/list', {
                viewTitle: "Employee List",
                list: docs
            });
        } else {
            console.log("Error in retriving employee list :" + err)
        }
    });
});

//GET with ID  
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

//DELETE 
router.get('/delete/:id', (req, res) => {
    Employee.findOneAndRemove(req.param.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        } else(console.log('Error in employee delete :' + err));
    });
});

function insertrecord(req, res) {
    var employee = new Employee();
    employee.fullname = req.body.fullname;
    employee.email = req.body.email;
    employee.gender = "male";
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });

            } else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res){
    Employee.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err,doc) =>{
        if(!err){
            res.redirect('employee/list');
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body)
                res.render('employee/addOrEdit', {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log("error during record :" + err)
        }
    })
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullname':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
            default:
                break;
        }
    }
}

module.exports = router;