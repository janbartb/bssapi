const express = require('express');
let verenigingRepo = require('../repos/verenigingRepo');

function verenigingRoutes() {
    const verenigingRouter = express.Router();
    verenigingRouter.route('/')
        .post((req, res, next) => {
            verenigingRepo.insert(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": `Vereniging '${data.naam}' is toegevoegd.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .put((req, res, next) => {
            verenigingRepo.save(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Saved",
                    "message": `Verenigingen succesvol opgeslagen.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            if (req.query.id || req.query.naam) {
                // perform a search
                let searchObject = {
                    'id': req.query.id,
                    'naam': req.query.naam
                };
                verenigingRepo.search(searchObject, function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": data.length + " vereniging(en) gevonden.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
            else {
                // GET all verenigingen
                verenigingRepo.get(function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "Alle verenigingen opgehaald.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
        });

    verenigingRouter.route('/lijst')
        .get((req, res, next) => {
            // GET all verenigingen
            verenigingRepo.getLijst(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Alle verenigingen opgehaald.",
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        });

    verenigingRouter.use('/:verenigingId', (req, res, next) => {
        verenigingRepo.getById(req.params.verenigingId, function(data) {
            if (data) {
                req.vereniging = data;
                next();
            }
            else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `Vereniging '${req.params.verenigingId}' niet gevonden.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `Vereniging '${req.params.verenigingId}' niet gevonden.`
                    }
                });
            }
        }, function(err) {
            req.middlewareError = err;
            next();
        });
    });

    verenigingRouter.route('/:verenigingId')
        .get((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": `Vereniging '${req.vereniging.verId}' opgehaald`,
                "data": req.vereniging
            });
        })
        .put((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            verenigingRepo.update(req.body, req.params.verenigingId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Vereniging '${req.params.verenigingId}' is gewijzigd.`,
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
            verenigingRepo.delete(req.params.verenigingId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Vereniging '${req.params.verenigingId}' is verwijderd.`,
                    "data": `Vereniging '${req.params.verenigingId}' is verwijderd.`
                });
            }, function(err) {
                next(err);
            });
        });

    return verenigingRouter;
};

module.exports = verenigingRoutes;
