const express = require('express');
let matchRepo = require('../repos/matchRepo');

function matchRoutes() {
    const matchRouter = express.Router();
    matchRouter.route('/')
        .post((req, res, next) => {
            matchRepo.save(req.body, function(data) {
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
            matchRepo.get(function(data) {
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
            matchRepo.delete(function(data) {
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

    return matchRouter;
};

module.exports = matchRoutes;
