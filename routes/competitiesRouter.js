const express = require('express');
let competitiesRepo = require('../repos/competitiesRepo');

function competitiesRoutes() {
    const competitiesRouter = express.Router();
    competitiesRouter.route('/')
        .post((req, res, next) => {
            competitiesRepo.insert(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": `Competitie '${data.id}' is toegevoegd.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            // GET all competities
            competitiesRepo.get(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "All competities retrieved.",
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        });

    competitiesRouter.use('/:compNaam', (req, res, next) => {
        competitiesRepo.getByNaam(req.params.compNaam, function(data) {
            if (data) {
                req.competitie = data;
                next();
            }
            else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `Competitie '${req.params.compNaam}' niet gevonden.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `Competitie '${req.params.compNaam}' niet gevonden.`
                    }
                });
            }
        }, function(err) {
            req.middlewareError = err;
            next();
        });
    });

    competitiesRouter.route('/:compNaam')
        .get((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single competitie retrieved.",
                "data": req.competitie
            });
        })
        .put((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            competitiesRepo.update(req.body, req.params.compNaam, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Competitie '${req.params.compNaam}' is gewijzigd.`,
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
            competitiesRepo.delete(req.params.compNaam, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Competitie '${req.params.compNaam}' is verwijderd.`,
                    "data": `Competitie '${req.params.compNaam}' is verwijderd.`
                });
            }, function(err) {
                next(err);
            });
        });

    return competitiesRouter;
};

module.exports = competitiesRoutes;
