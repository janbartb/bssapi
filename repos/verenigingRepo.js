const fs = require('fs');
const FILE_NAME = './assets/verenigingen.json';

const verenigingRepo = {
    // get all verenigingen
    get: function(resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    },
    // get verenigingen lijst
    getLijst: function(resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let verenigingen = JSON.parse(data);
                let lijst = [];
                verenigingen.forEach(v => {
                    let entry = {
                        "id": v.verId,
                        "naam": v.naam
                    };
                    lijst.push(entry);
                });
                resolve(lijst);
            }
        });
    },
    // get one vereniging
    getById: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let foundVereniging = JSON.parse(data).find((vereniging) => { return vereniging.verId == id });
                resolve(foundVereniging);
            }
        });
    },
    // search vereniging
    search: function(searchObject, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let verenigingen = JSON.parse(data);
                if (searchObject) {
                    // Example search object
                    // let searchObject = {
                    //     "id": 1,
                    //     "naam": 'A'
                    // };
                    verenigingen = verenigingen.filter((vereniging) => {
                        return (searchObject.id ? vereniging.verId == searchObject.id : true) && 
                                (searchObject.naam ? vereniging.naam == searchObject.naam : true);
                    });
                }
                resolve(verenigingen);
            }
        });
    },
    // insert vereniging
    insert: function(newData, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let verenigingen = JSON.parse(data);
                verenigingen.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(verenigingen, undefined, 4), function(err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(newData);
                    }
                });
             }
        });
    },
    // save alle verenigingen
    save: function(newData, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let verenigingen = newData;
                fs.writeFile(FILE_NAME, JSON.stringify(verenigingen, undefined, 4), function(err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(newData);
                    }
                });
             }
        });
    },
    // update vereniging
    update: function(newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let verenigingen = JSON.parse(data);
                let vereniging = verenigingen.find(t => t.verId == id);
                if (vereniging) {
                    Object.assign(vereniging, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(verenigingen, undefined, 4), function(err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(newData);
                        }
                    });
                }
             }
        });
    },
    // delete vereniging
    delete: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let verenigingen = JSON.parse(data);
                let index = verenigingen.findIndex(t => t.verId == id);
                if (index >= 0) {
                    verenigingen.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(verenigingen, undefined, 4), function(err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(index);
                        }
                    });
                }
             }
        });
    }
};

module.exports = verenigingRepo;
