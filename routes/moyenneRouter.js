const express = require('express');
let moyenneRepo = require('../repos/moyenneRepo');

function moyenneRoutes() {
    const moyenneRouter = express.Router();
    moyenneRouter.route('/')
        .post((req, res, next) => {
            moyenneRepo.insert(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": `Moyenne tabel '${data.tabId}' is toegevoegd.`,
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
                moyenneRepo.search(searchObject, function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": data.length + " moyenne tabellen gevonden.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
            else {
                // GET alle moyenne tabellen
                moyenneRepo.get(function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "Alle moyenne tabellen opgehaald.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
        });

    moyenneRouter.use('/:tabId', (req, res, next) => {
        moyenneRepo.getById(req.params.tabId, function(data) {
            if (data) {
                req.tabel = data;
                next();
            }
            else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `Moyenne tabel '${req.params.tabId}' niet gevonden.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `Moyenne tabel '${req.params.tabId}' niet gevonden.`
                    }
                });
            }
        }, function(err) {
            req.middlewareError = err;
            next();
        });
    });

    moyenneRouter.route('/:tabId')
        .get((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": `Moyenne tabel '${req.params.tabId}' is opgehaald.`,
                "data": req.tabel
            });
        })
        .put((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            moyenneRepo.update(req.body, req.params.tabId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Moyenne tabel '${req.params.tabId}' is gewijzigd.`,
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
            moyenneRepo.delete(req.params.tabId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Moyenne tabel '${req.params.tabId}' is verwijderd.`,
                    "data": true
                });
            }, function(err) {
                next(err);
            });
        });

    return moyenneRouter;
};

module.exports = moyenneRoutes;
