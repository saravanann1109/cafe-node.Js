var mongoose = require('mongoose');
var uniqid = require('uniqid');

const ItemMasterSchema = mongoose.Schema({
    Id: String,
    Code: String,
    Name: String,
    Cost: Number,
    IsRegularMenu: Boolean,
    ForBreakFast: Boolean,
    ForLunch: Boolean,
    ForDinner: Boolean,
    ForSnack: Boolean,
    IsActive: Boolean,
    Quantity: Number,
    CreatedDate: Date,
    ModifiedDate: Date,
    CreatedBy: String,
    ModifiedBy: String,
    Image: String
});

module.exports = mongoose.model('ItemMaster', ItemMasterSchema);