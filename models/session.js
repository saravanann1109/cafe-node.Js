var mongoose = require('mongoose');
var uniqid = require('uniqid');
var User = require('./user');

const userSchema = mongoose.Schema({

    Id: String,
    Name: String,
    EmployeeId: String,
    IsActive: Boolean,
    Department: String,
    EmailId: String,
    UserName: String,
    Password: String,
    CreatedBy:String,
    CreatedDate:String,
    ModifiedBy:String,
    ModifiedDate:String,
    Role: String,
    ForcePasswordReset: Boolean
});

const sessionSchema = mongoose.Schema({

    Id: String,
    IsActive: Boolean,
    User: userSchema,
    CreatedDate: Date,
    ModifiedDate: Date
});

module.exports = mongoose.model('session', sessionSchema);