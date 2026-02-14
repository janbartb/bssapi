const express = require('express');
let annonRepo = require('../repos/annonRepo');

function annonRoutes() {
    const annonRouter = express.Router();
    annonRouter.route('/')
        .post((req, res, next) => {
            annonRepo.save(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": "Annonceer wedstrijd opgeslagen.",
                    "data": "success"
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            annonRepo.get(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Annonceer wedstrijd opgehaald.",
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .delete((req, res, next) => {
            annonRepo.delete(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": 'Annonceer wedstrijd is verwijderd.',
                    "data": 'Annonceer wedstrijd is verwijderd.'
                });
            }, function(err) {
                next(err);
            });
        });

    return annonRouter;
};

module.exports = annonRoutes;
