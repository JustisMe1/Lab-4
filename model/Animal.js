const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

//  Connect to MongoDB Server using the connection string in the `.env` file.
const conn = process.env.DB_STRING;

mongoose.connect(conn);

// Creates simple schema for a User. 
// The hash and salt are derived from the user's given password when they register
const AnimalSchema = new mongoose.Schema({
	Zoo: { type: String, required: true},
    ScientificName: { type: String, required: true },
    CommonName: { type: String, required: true },
    Gender: { type: String, required: true },
    DateOfBirth: { type: Date, required: true },
    Age: { type: Number, required: true },
    isTransportable: { type: Boolean, required: true, default: false }
});

// Expose the connection
module.exports.Animal = mongoose.model('Animal', AnimalSchema);