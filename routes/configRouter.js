const express = require('express');
let configRepo = require('../repos/configRepo');

function configRoutes() {
    const configRouter = express.Router();
    configRouter.route('/')
        .post((req, res, next) => {
            configRepo.save(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": "Instellingen opgeslagen.",
                    "data": "success"
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            configRepo.get(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Instellingen opgehaald.",
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        });

    configRouter.route('/exists')
        .get((req, res, next) => {
            configRepo.exists(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Match opgehaald.",
                    "data": data
                });
            });
        });

    return configRouter;
};

module.exports = configRoutes;
