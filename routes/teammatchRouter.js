const express = require('express');
let teammatchRepo = require('../repos/teammatchRepo');

function teammatchRoutes() {
    const teammatchRouter = express.Router();
    teammatchRouter.route('/')
        .post((req, res, next) => {
            teammatchRepo.save(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": "Team match opgeslagen.",
                    "data": "success"
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            teammatchRepo.get(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Team match opgehaald.",
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .delete((req, res, next) => {
            teammatchRepo.delete(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": 'Team match is verwijderd.',
                    "data": 'Team match is verwijderd.'
                });
            }, function(err) {
                next(err);
            });
        });

    return teammatchRouter;
};

module.exports = teammatchRoutes;
