var mongoose = require('mongoose');
const enumValues = require('mongoose-enumvalues');
const orderSchema = mongoose.Schema({

    Id: String,
    OrderedBy: String,
    Status: {
        type: String,
        enum: ['NewOrder', 'Delivered', 'Cancelled', 'Accepted', 'Rejected'],
        default: 'NewOrder'
    },
    tempStatus: String,
    CreatedDate: Date,
    ModifiedDate: Date,
    ModifiedBy:String,
    IsPacking: Boolean,
    TotalAmount: Number,
    OrderedList: [{
        Id: String,
        ItemCode: String,
        ItemName: String,
        ItemCost: Number,
        Quantity: Number,
        IsPacking: Boolean,
        Comments: String,
        Amount: Number,
        TimeRequired: Date
    }],
    tempOrderedDate: String,
});

module.exports = mongoose.model('Orders', orderSchema);