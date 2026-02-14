const express = require('express');
let spelerRepo = require('../repos/spelerRepo');

function spelerRoutes() {
    const spelerRouter = express.Router();
    spelerRouter.route('/')
        .post((req, res, next) => {
            spelerRepo.insert(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": `Speler '${data.id}' is toegevoegd.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .put((req, res, next) => {
            spelerRepo.update(req.body, '', function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Spelers zijn gewijzigd.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            if (req.query.verId) {
                // perform a search
                let searchObject = {
                    'verId': req.query.verId
                };
                spelerRepo.search(searchObject, function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": data.length + " spelers gevonden.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
            else {
                // GET all spelers
                spelerRepo.get(function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All spelers retrieved.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
        });

    spelerRouter.use('/:spelerId', (req, res, next) => {
        spelerRepo.getById(req.params.spelerId, function(data) {
            if (data) {
                req.speler = data;
                next();
            }
            else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `Speler '${req.params.spelerId}' niet gevonden.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `Speler '${req.params.spelerId}' niet gevonden.`
                    }
                });
            }
        }, function(err) {
            req.middlewareError = err;
            next();
        });
    });

    spelerRouter.route('/:spelerId')
        .get((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single speler retrieved.",
                "data": req.speler
            });
        })
        .put((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            spelerRepo.update(req.body, req.params.spelerId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Speler '${req.params.spelerId}' is gewijzigd.`,
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
            spelerRepo.delete(req.params.spelerId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Speler '${req.params.spelerId}' is verwijderd.`,
                    "data": `Speler '${req.params.spelerId}' is verwijderd.`
                });
            }, function(err) {
                next(err);
            });
        });

    return spelerRouter;
};

module.exports = spelerRoutes;
