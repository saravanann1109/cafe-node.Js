var mongoose = require('mongoose');
var uniqid = require('uniqid');
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

module.exports = mongoose.model('User', userSchema);