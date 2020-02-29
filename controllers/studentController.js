const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

// method to handle validation error
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

// HTTP GET request
router.get('/', (req, res) => {
    res.render('student/addOrEdit', {
        viewTitle: 'Insert Student Details'
    });
});


// HTTP POST request
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

// method to insert student records into mongodb
function insertRecord(req, res) {
    const student = new Student();
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;

    student.save((err, doc) => {
        if (!err)
            res.redirect('student/list');
        else
            console.log('Error occured during record insertion ', err);
    });
}

// method to update student details
function updateRecord(req, res) {
    Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('student/list'); } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("student/addOrEdit", {
                    viewTitle: 'Update Student',
                    student: req.body
                });
            } else
                console.log('Error during record update : ' + err);
        }
    });
}

// HTTP DELETE request
router.get('/delete/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/student/list');
        } else { console.log('Error in student delete :' + err); }
    });
});

// GET request for list of students
router.get('/list', (req, res) => {
    Student.find((err, docs) => {
        if (!err) {
            res.render("student/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving student list :' + err);
        }
    });
});

// GET request for getting the specific students                                     
router.get('/:id', (req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("student/addOrEdit", {
                viewTitle: "Update Student",
                student: doc
            });
        }
    });
});

module.exports = router;