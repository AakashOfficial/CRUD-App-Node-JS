// Import Mongoose module
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://test_user:XgaG81tEsLOKJw00@mongocluster-vahm9.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

require('./student.model');