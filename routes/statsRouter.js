const express = require('express');
let statsRepo = require('../repos/statsRepo');

function statsRoutes() {
    const statsRouter = express.Router();
    statsRouter.route('/')
        .post((req, res, next) => {
            statsRepo.create(function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": "Stats aangemaakt.",
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            statsRepo.stats(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Stats opgehaald.",
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        });

    statsRouter.route('/exists')
        .get((req, res, next) => {
            statsRepo.exists(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Match opgehaald.",
                    "data": data
                });
            });
        });

    return statsRouter;
};

module.exports = statsRoutes;
