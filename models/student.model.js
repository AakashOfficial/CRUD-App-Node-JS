const mongoose = require('mongoose');

// create a schema
const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full Name is required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    mobile: {
        type: String,
        required: 'Mobile is required'
    },
    city: {
        type: String,
        required: 'City is required'
    }
});

// compile the schema into a model which gives a class   
mongoose.model('Student', studentSchema);