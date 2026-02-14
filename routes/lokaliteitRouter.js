const express = require('express');
let lokaliteitRepo = require('../repos/lokaliteitRepo');

function lokaliteitRoutes() {
    const lokaliteitRouter = express.Router();
    lokaliteitRouter.route('/')
        .post((req, res, next) => {
            lokaliteitRepo.insert(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "OK",
                    "message": `Lokaliteit '${data.naam}' is toegevoegd.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            if (req.query.lokId || req.query.lokNaam) {
                // perform a search
                let searchObject = {
                    'id': req.query.lokId,
                    'naam': req.query.loklNaam
                };
                lokaliteitRepo.search(searchObject, function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All found lokaliteiten retrieved.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
            else {
                // GET all lokaliteiten
                lokaliteitRepo.get(function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All lokaliteiten retrieved.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
        });

    lokaliteitRouter.use('/:lokId', (req, res, next) => {
        lokaliteitRepo.getById(req.params.lokId, function(data) {
            if (data) {
                req.lokaliteit = data;
                next();
            }
            else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `Lokaliteit '${req.params.lokId}' niet gevonden.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `Lokaliteit '${req.params.lokId}' niet gevonden.`
                    }
                });
            }
        }, function(err) {
            req.middlewareError = err;
            next();
        });
    });

    lokaliteitRouter.route('/:lokId')
        .get((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single lokaliteit retrieved.",
                "data": req.lokaliteit
            });
        })
        .put((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            lokaliteitRepo.update(req.body, req.params.lokId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Lokaliteit '${data.naam}' is gewijzigd.`,
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
            lokaliteitRepo.delete(req.params.lokId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Lokaliteit '${data.naam}' is verwijderd.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        });

    return lokaliteitRouter;
};

module.exports = lokaliteitRoutes;
