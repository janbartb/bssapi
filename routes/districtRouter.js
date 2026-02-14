const express = require('express');
let districtRepo = require('../repos/districtRepo');

function districtRoutes() {
    const districtRouter = express.Router();
    districtRouter.route('/')
        .post((req, res, next) => {
            districtRepo.insert(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "OK",
                    "message": `District '${data.disNaam}' is toegevoegd.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            if (req.query.disId || req.query.disNaam) {
                // perform a search
                let searchObject = {
                    'id': req.query.disId,
                    'naam': req.query.disNaam
                };
                districtRepo.search(searchObject, function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All found districten retrieved.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
            else {
                // GET all districten
                districtRepo.get(function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All districten retrieved.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
        });

    districtRouter.use('/:disId', (req, res, next) => {
        districtRepo.getById(req.params.disId, function(data) {
            if (data) {
                req.district = data;
                next();
            }
            else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `District '${req.params.disId}' niet gevonden.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `District '${req.params.disId}' niet gevonden.`
                    }
                });
            }
        }, function(err) {
            req.middlewareError = err;
            next();
        });
    });

    districtRouter.route('/:disId')
        .get((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single district retrieved.",
                "data": req.district
            });
        })
        .put((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            districtRepo.update(req.body, req.params.disId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `District '${data.disNaam}' is gewijzigd.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .delete((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            districtRepo.delete(req.params.disId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `District '${data.disNaam}' is verwijderd.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        });

    return districtRouter;
};

module.exports = districtRoutes;
