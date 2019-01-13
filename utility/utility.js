const Order = require('../models/order');
var uniqid = require('uniqid');


exports.orderById = function(Id)
{
   Order.findById(Id)
    .exec()
    .then(docs =>{
      return docs; 
    })
    .catch(err => {
        console.log(err)
       return null;
    });
}