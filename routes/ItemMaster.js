const express = require('express');
const router = express.Router();
const ItemMaster = require('../models/menu-item');
var uniqid = require('uniqid');


router.get("/", (req, res, next) => {
    ItemMaster.find()
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

router.post("/", (req, res, next) => {
    const itemMaster = new ItemMaster({
        Id: uniqid(),
        Code: req.body.Code,
        Name: req.body.Name,
        Cost:req.body.Cost,
        Quantity:req.body.Quantity,
        Image:req.body.Image,
        IsActive:req.body.IsActive,
        CreatedDate : new Date(),
        CreatedBy : req.body.CreatedBy
    });
    itemMaster
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
    ItemMaster.update({
            Id: id
        }, {
            $set: req.body
        })
        .exec()
        .then(result => {
            console.log(result);
             res.status(200).json(req.body);
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
    ItemMaster.remove({ "Id": id })
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