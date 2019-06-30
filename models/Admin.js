const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var AdminSchema = mongoose.Schema({
  type: {
    type: String,
    default: "a"
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  registeredDate: {
    type: Date,
    default: Date.now()
  }
});

var Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.createAdmin = (newUser, done) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(done);
        });
    });
};

module.exports.getAdminByEmail = (username, done) => {
    var query = {email: username};
    Admin.findOne(query, done);
};

module.exports.comparePassword = (candidatePassword, hash, done) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        done(null, isMatch);
    });
};
