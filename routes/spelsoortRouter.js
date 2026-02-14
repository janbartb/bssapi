const express = require('express');
let spelsoortRepo = require('../repos/spelsoortRepo');

function spelsoortRoutes() {
    const spelsoortRouter = express.Router();
    spelsoortRouter.route('/')
        .post((req, res, next) => {
            spelsoortRepo.insert(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "OK",
                    "message": `Spelsoort '${data.spelsoortNaam}' is toegevoegd.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            if (req.query.spelId || req.query.spelNaam) {
                // perform a search
                let searchObject = {
                    'id': req.query.spelId,
                    'naam': req.query.spelNaam
                };
                spelsoortRepo.search(searchObject, function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All found spelsoorten retrieved.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
            else {
                // GET all spelsoorten
                spelsoortRepo.get(function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All spelsoorten retrieved.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
        });

    spelsoortRouter.use('/:spelId', (req, res, next) => {
        spelsoortRepo.getById(req.params.spelId, function(data) {
            if (data) {
                req.spelsoort = data;
                next();
            }
            else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `Spelsoort '${req.params.spelId}' niet gevonden.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `Spelsoort '${req.params.spelId}' niet gevonden.`
                    }
                });
            }
        }, function(err) {
            req.middlewareError = err;
            next();
        });
    });

    spelsoortRouter.route('/:spelId')
        .get((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single spelsoort retrieved.",
                "data": req.spelsoort
            });
        })
        .put((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            spelsoortRepo.update(req.body, req.params.spelId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Spelsoort '${data.spelsoortNaam}' is gewijzigd.`,
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
            spelsoortRepo.delete(req.params.spelId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Spelsoort '${data.spelsoortNaam}' is verwijderd.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        });

    return spelsoortRouter;
};

module.exports = spelsoortRoutes;
