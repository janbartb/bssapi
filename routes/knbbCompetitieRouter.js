const express = require('express');
let knbbCompetitieRepo = require('../repos/knbbCompetitieRepo');

function knbbCompetitieRoutes() {
    const knbbCompetitieRouter = express.Router();

    knbbCompetitieRouter.use('/:district/:spel', (req, res, next) => {
        knbbCompetitieRepo.exists(req.params.district, req.params.spel, function(data) {
            if (data) {
                next();
            }
            else {
                res.status(400).json({
                    "status": 400,
                    "statusText": "Bad Request",
                    "message": `Error creating file 'competities.json' in dir 'knbb/${req.params.district}/${req.params.spel}'.`,
                    "error": {
                        "code": "BAD_REQUEST",
                        "message": `Error creating file 'competities.json' in dir 'knbb/${req.params.district}/${req.params.spel}'.`
                    }
                });
            }
        }, function(err) {
            req.middlewareError = err;
            next();
        });
    });

    knbbCompetitieRouter.route('/:district/:spel')
        .post((req, res, next) => {
            knbbCompetitieRepo.insert(req.params.district, req.params.spel, req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": `KNBB competitie '${data.competitieId}' is toegevoegd.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .put((req, res, next) => {
            knbbCompetitieRepo.save(req.params.district, req.params.spel, req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Saved",
                    "message": `KNBB competities succesvol opgeslagen.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            if (req.query.spelId) {
                // perform a search
                let searchObject = {
                    'spelId': req.query.spelId
                };
                knbbCompetitieRepo.search(req.params.district, req.params.spel, searchObject, function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": data.length + " KNBB competities gevonden.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
            else {
                // GET alle KNBB competities
                knbbCompetitieRepo.get(req.params.district, req.params.spel, function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "Alle KNBB competities opgehaald.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
        });

    knbbCompetitieRouter.use('/:district/:spel/:compId', (req, res, next) => {
        knbbCompetitieRepo.getById(req.params.district, req.params.spel, req.params.compId, function(data) {
            if (data) {
                req.competitie = data;
                next();
            }
            else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `KNBB competitie '${req.params.compId}' niet gevonden.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `KNBB competitie '${req.params.compId}' niet gevonden.`
                    }
                });
            }
        }, function(err) {
            req.middlewareError = err;
            next();
        });
    });

    knbbCompetitieRouter.route('/:district/:spel/:compId')
        .get((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": `KNBB competitie '${req.params.compId}' is opgehaald.`,
                "data": req.competitie
            });
        })
        .put((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            knbbCompetitieRepo.update(req.params.district, req.params.spel, req.body, req.params.compId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `KNBB competitie '${req.params.compId}' is gewijzigd.`,
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
            knbbCompetitieRepo.delete(req.params.district, req.params.spel, req.params.compId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `KNBB competitie '${req.params.compId}' is verwijderd.`,
                    "data": true
                });
            }, function(err) {
                next(err);
            });
        });

    return knbbCompetitieRouter;
};

module.exports = knbbCompetitieRoutes;
