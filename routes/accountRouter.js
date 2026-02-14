const express = require('express');
let accountRepo = require('../repos/accountRepo');

function accountRoutes() {
    const accountRouter = express.Router();
    accountRouter.route('/')
        .post((req, res, next) => {
            accountRepo.insert(req.body, function(data) {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": `Account '${data.userId}' is toegevoegd.`,
                    "data": data
                });
            }, function(err) {
                next(err);
            });
        })
        .put((req, res, next) => {
            accountRepo.update(req.body, '', function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Accounts zijn gewijzigd.`,
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
                accountRepo.search(searchObject, function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": data.length + " accounts gevonden.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
            else {
                // GET all accounts
                accountRepo.get(function(data) {
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All accounts retrieved.",
                        "data": data
                    });
                }, function(err) {
                    next(err);
                });
            }
        });

    accountRouter.use('/:userId', (req, res, next) => {
        accountRepo.getById(req.params.userId, function(data) {
            if (data) {
                req.account = data;
                next();
            }
            else {
                res.status(404).json({
                    "status": 404,
                    "statusText": "Not Found",
                    "message": `Account '${req.params.userId}' niet gevonden.`,
                    "error": {
                        "code": "NOT_FOUND",
                        "message": `Account '${req.params.userId}' niet gevonden.`
                    }
                });
            }
        }, function(err) {
            req.middlewareError = err;
            next();
        });
    });

    accountRouter.route('/:userId')
        .get((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single account retrieved.",
                "data": req.account
            });
        })
        .put((req, res, next) => {
            if (req.middlewareError) {
                return next(req.middlewareError);
            }
            accountRepo.update(req.body, req.params.userId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Account '${req.params.userId}' is gewijzigd.`,
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
            accountRepo.delete(req.params.userId, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": `Account '${req.params.userId}' is verwijderd.`,
                    "data": `Account '${req.params.userId}' is verwijderd.`
                });
            }, function(err) {
                next(err);
            });
        });

    return accountRouter;
};

module.exports = accountRoutes;
