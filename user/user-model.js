const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    country: {type: String, required: true },
    age: { type: String, required: true },
    created: { type: Date, default: Date.now }
});


module.exports = mongoose.model('user', userSchema);
