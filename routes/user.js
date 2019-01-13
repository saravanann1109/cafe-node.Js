const express = require('express');
const router = express.Router();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const User = require('../models/user');
const mongoose = require("mongoose");
// Handle incoming GET requests to /orders
var uniqid = require('uniqid');

router.get("/", (req, res, next) => {
    User.find()
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

router.get("/:Id", (req, res, next) => {
    const id = req.params.Id;
    User.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res
                    .status(404)
                    .json({
                        message: "No valid entry found for provided ID"
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/", (req, res, next) => {
    var passsword = '';
    if (req.body.ForcePasswordReset && req.body.ForcePasswordReset === true) {
        passsword = cryptr.encrypt('123456');
        console.log(passsword);
    }
    const user = new User({
        Id: uniqid(),
        Name: req.body.Name,
        EmployeeId: req.body.EmployeeId,
        IsActive: req.body.IsActive,
        Department: req.body.Department,
        EmailId: req.body.EmailId,
        UserName: req.body.UserName,
        Role: req.body.Role.Name,
        CreatedBy: req.body.CreatedBy,
        CreatedDate: new Date(),
        Password: req.body.ForcePasswordReset === true ? passsword : req.body.Password,
        ForcePasswordReset: req.body.ForcePasswordReset
    });
    user
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

router.put("/:Id", (req, res, next) => {
    const id = req.params.Id;
    var passsword = '';
    if (req.body.ForcePasswordReset && req.body.ForcePasswordReset === true) {
        passsword = cryptr.encrypt('123456');
    }
    const user = new User({
        Id: req.body.Id,
        Name: req.body.Name,
        EmployeeId: req.body.EmployeeId,
        IsActive: req.body.IsActive,
        Department: req.body.Department,
        EmailId: req.body.EmailId,
        UserName: req.body.UserName,
        ModifiedBy: req.body.ModifiedBy,
        ModifiedDate: new Date(),
        Role: req.body.Role.Name,
        Password: req.body.ForcePasswordReset === true ? passsword : req.body.Password,
        ForcePasswordReset: req.body.ForcePasswordReset
    });
    user.update({
            Id: id
        }, {
            $set: user
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:Id", (req, res, next) => {
    const id = req.params.Id;
    User.remove({
            "Id": id
        })
        .exec()
        .then(result => {
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