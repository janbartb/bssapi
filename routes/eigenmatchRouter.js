const express = require('express');
let eigenmatchRepo = require('../repos/eigenmatchRepo');

function eigenmatchRoutes() {
    const eigenmatchRouter = express.Router();
    eigenmatchRouter.route('/')
        .post((req, res, next) => {
            eigenmatchRepo.save(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": "Match opgeslagen.",
                    "data": "success"
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            eigenmatchRepo.get(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Match opgehaald.",
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .delete((req, res, next) => {
            eigenmatchRepo.delete(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": 'Match is verwijderd.',
                    "data": 'Match is verwijderd.'
                });
            }, function(err) {
                next(err);
            });
        });

    return eigenmatchRouter;
};

module.exports = eigenmatchRoutes;
