const express = require('express');
let competitieRepo = require('../repos/competitieRepo');

function competitieRoutes() {
    const competitieRouter = express.Router();
    competitieRouter.route('/')
        .get((req, res, next) => {
            competitieRepo.dirList(function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Competitie namen opgehaald.`,
                    "data": data
                });
            });
        })
    competitieRouter.route('/:name')
        .post((req, res, next) => {
            competitieRepo.save(req.params.name, req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": `Competitie ${req.params.name} opgeslagen.`,
                    "data": "success"
                });
            }, function(err) {
                next(err);
            });
        })
        .get((req, res, next) => {
            competitieRepo.get(req.params.name, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Competitie ${req.params.name} opgehaald.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .delete((req, res, next) => {
            competitieRepo.delete(req.params.name, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Competitie ${req.params.name} verwijderd.`,
                    "data": `Competitie ${req.params.name} verwijderd.`
                });
            }, function(err) {
                next(err);
            });
        });

    return competitieRouter;
};

module.exports = competitieRoutes;
