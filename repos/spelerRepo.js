let fs = require('fs');
const FILE_NAME = './assets/spelers.json';

let spelerRepo = {
    // get all spelers
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
    // get one speler
    getById: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let foundSpeler = JSON.parse(data).find((speler) => { return speler.id == id });
                resolve(foundSpeler);
            }
        });
    },
    // search
    search: function(searchObject, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let spelers = JSON.parse(data);
                if (searchObject) {
                    // Example search object
                    // let searchObject = {
                    //     "verId": "bvd"
                    // };
                    spelers = spelers.filter((speler) => {
                        if (searchObject.verId) {
                            return speler.verenigingIds.some(id => id == searchObject.verId);
                        }
                        return false;
                    });
                }
                resolve(spelers);
            }
        });
    },
    // insert a speler
    insert: function(newData, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let spelers = JSON.parse(data);
                spelers.push(...newData);
                fs.writeFile(FILE_NAME, JSON.stringify(spelers, undefined, 4), function(err) {
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
    // update a speler
    update: function(newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let spelers = JSON.parse(data);
                if (Array.isArray(newData)) {
                    newData.forEach(spl => {
                        let speler = spelers.find(s => s.id == spl.id);
                        if (speler) {
                            Object.assign(speler, spl);
                        }
                    });
                    fs.writeFile(FILE_NAME, JSON.stringify(spelers, undefined, 4), function(err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(newData);
                        }
                    });                    
                }
                else {
                    let speler = spelers.find(s => s.id == id);
                    if (speler) {
                        Object.assign(speler, newData);
                        fs.writeFile(FILE_NAME, JSON.stringify(spelers, undefined, 4), function(err) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(newData);
                            }
                        });
                    }
                }
             }
        });
    },
    // delete a speler
    delete: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let spelers = JSON.parse(data);
                let index = spelers.findIndex(s => s.id == id);
                if (index >= 0) {
                    spelers.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(spelers, undefined, 4), function(err) {
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

module.exports = spelerRepo;
