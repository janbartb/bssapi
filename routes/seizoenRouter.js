const express = require('express');
let seizoenRepo = require('../repos/seizoenRepo');

function seizoenRoutes() {
    const seizoenRouter = express.Router();
    seizoenRouter.route('/')
        .post((req, res, next) => {
            seizoenRepo.save(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": "Seizoenen opgeslagen.",
                    "data": "success"
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            seizoenRepo.get(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Seizoenen opgehaald.",
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        });

    return seizoenRouter;
};

module.exports = seizoenRoutes;
