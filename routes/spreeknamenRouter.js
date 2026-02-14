const express = require('express');
let spreeknamenRepo = require('../repos/spreeknamenRepo');

function spreeknamenRoutes() {
    const spreeknamenRouter = express.Router();
    spreeknamenRouter.route('/')
        .post((req, res, next) => {
            spreeknamenRepo.insert(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": "Nieuwe spreeknaam toegevoegd.",
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            if (req.query.naam) {
                // perform a search
                let searchObject = {
                    'naam': req.query.naam
                };
                spreeknamenRepo.search(searchObject, function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All found spreeknamen retrieved.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
            else {
                // GET all spelers
                spreeknamenRepo.get(function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All spreeknamen retrieved.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
        });

    spreeknamenRouter.use('/:naam', (req, res, next) => {
        spreeknamenRepo.getById(req.params.naam, function(data) {
            if (data) {
                req.speler = data;
                next();
            }
            else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `Spreeknaam '${req.params.naam}' could not be found.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `Spreeknaam '${req.params.naam}' could not be found.`
                    }
                });
            }
        }, function(err) {
            req.middlewareError = err;
            next();
        });
    });

    spreeknamenRouter.route('/:naam')
        .get((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single spreeknaam retrieved.",
                "data": req.speler
            });
        })
        .put((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            spreeknamenRepo.update(req.body, req.params.naam, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Spreeknaam '${req.params.naam}' updated.`,
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
            spreeknamenRepo.delete(req.params.naam, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Spreeknaam '${req.params.naam}' is deleted.`,
                    "data": `Spreeknaam '${req.params.naam}' is deleted.`
                });
            }, function(err) {
                next(err);
            });
        });

    return spreeknamenRouter;
};

module.exports = spreeknamenRoutes;
