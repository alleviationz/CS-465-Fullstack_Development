const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// ensure unique fields for email and name, all fields required
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // password saved as separate hash and salt to protect password
    hash: String,
    salt: String,
});

// Method to set the password on this record, encrpts with hash and salt using sha512
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, 'sha512').toString('hex');
};


// Method to compare entered password against stored hash, uses sha512 and reverses the hash and salt
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};


// Method to generate a JSON Web Token for the current record (1hr token)
userSchema.methods.generateJWT = function() {
    return jwt.sign(
    { // Payload for our JSON Web Token
        _id: this._id,
        email: this.email,
        name: this.name,
    },
    process.env.JWT_SECRET, //SECRET stored in .env file
    { expiresIn: '1h' }); //Token expires an hour from creation
};


const User = mongoose.model('users', userSchema);
module.exports = User;