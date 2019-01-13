const express = require('express');
const router = express.Router();
const Order = require('../models/order');
var uniqid = require('uniqid');
const utility = require('../utility/utility');
router.post("/", (req, res, next) => {
    const order = new Order({
        Id: uniqid(),
        Status: req.body.Status,
        OrderedBy:req.body.OrderedBy,
        CreatedDate: new Date(),
        TotalAmount: req.body.TotalAmount,
        OrderedList: req.body.OrderedList,
    });
    order
        .save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/", (req, res, next) => {
    Order.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/:id", (req, res, next) => {
    const id = req.params.Id;
    Order.findById("5c3b19a1049b101ed004ed9b")
    .exec()
    .then(docs =>{
        res.status(200).json(docs); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})

router.put("/:Id", (req, res, next) => {
    const id = req.params.Id;
        const updatedOrder = req.body;
        updatedOrder.ModifiedDate = new Date();
        Order.update({
            Id: id
        }, {
            $set: updatedOrder
        })
        .exec()
        .then(result => {
            console.log(result);
             res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });  
});

module.exports = router;