const express = require('express');
let wedstrijdRepo = require('../repos/wedstrijdRepo');

function wedstrijdRoutes() {
    const wedstrijdRouter = express.Router();
    wedstrijdRouter.route('/')
        .post((req, res, next) => {
            wedstrijdRepo.save(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": "Wedstrijd opgeslagen.",
                    "data": "success"
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            wedstrijdRepo.get(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Wedstrijd opgehaald.",
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .delete((req, res, next) => {
            wedstrijdRepo.delete(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": 'Wedstrijd is verwijderd.',
                    "data": 'Wedstrijd is verwijderd.'
                });
            }, function(err) {
                next(err);
            });
        });

    return wedstrijdRouter;
};

module.exports = wedstrijdRoutes;
