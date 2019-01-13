const express = require('express');
const router = express.Router();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const User = require('../models/user');
const Session = require('../models/session');
var uniqid = require('uniqid');

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Session.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
})

router.post("/", (req, res, next) => {
    let user = {};
    let tempUser = {};
    User.find()
        .exec()
        .then(docs => {
            user = docs.filter((user) => {
                return user.UserName === req.body.UserName;
            });
            if (user[0].UserName === req.body.UserName && cryptr.decrypt(user[0].Password) === req.body.Password) {
                const session = new Session({
                    Id: uniqid(),
                    User: user[0],
                    CreatedDate: new Date()
                })
                session
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
            } else {
                res.status(404).json("Invalid Credentails!!!.");
            }
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
    Session.remove({
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