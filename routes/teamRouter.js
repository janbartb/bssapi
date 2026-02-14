const express = require('express');
let teamRepo = require('../repos/teamRepo');

function teamRoutes() {
    const teamRouter = express.Router();
    teamRouter.route('/')
        .post((req, res, next) => {
            teamRepo.insert(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": "New team added.",
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            if (req.query.id || req.query.naam || req.query.spelsoort) {
                // perform a search
                let searchObject = {
                    'id': req.query.id,
                    'naam': req.query.naam,
                    'spelsoort': req.query.spelsoort
                };
                teamRepo.search(searchObject, function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All found teams retrieved.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
            else {
                // GET all teams
                teamRepo.get(function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All teams retrieved.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
        });

    teamRouter.use('/:teamId', (req, res, next) => {
        teamRepo.getById(req.params.teamId, function(data) {
            if (data) {
                req.team = data;
                next();
            }
            else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `Team '${req.params.teamId}' could not be found.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `Team '${req.params.teamId}' could not be found.`
                    }
                });
            }
        }, function(err) {
            req.middlewareError = err;
            next();
        });
    });

    teamRouter.route('/:teamId')
        .get((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single team retrieved.",
                "data": req.team
            });
        })
        .put((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            teamRepo.update(req.body, req.params.teamId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Team '${req.params.teamId}' updated.`,
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
            teamRepo.delete(req.params.teamId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Team '${req.params.teamId}' is deleted.`,
                    "data": `Team '${req.params.teamId}' is deleted.`
                });
            }, function(err) {
                next(err);
            });
        });

    return teamRouter;
};

module.exports = teamRoutes;
