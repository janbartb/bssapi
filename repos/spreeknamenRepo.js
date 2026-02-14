let fs = require('fs');
const FILE_NAME = './assets/spreeknamen.json';

let spreeknamenRepo = {
    // get all spreeknamen
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
    // get one spreeknaam
    getById: function(naam, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let foundSpreeknaam = JSON.parse(data).find((spreeknaam) => { return spreeknaam.naam == naam });
                resolve(foundSpreeknaam);
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
                let spreeknamen = JSON.parse(data);
                if (searchObject) {
                    // Example search object
                    // let searchObject = {
                    //     "id": 1,
                    //     "naam": 'A',
                    //     "team": 'BVD1'
                    // };
                    spreeknamen = spreeknamen.filter((spreeknaam) => {
                        if (searchObject.naam && spreeknaam.naam.toLowerCase().indexOf(searchObject.naam.toLowerCase()) < 0) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    });
                }
                resolve(spreeknamen);
            }
        });
    },
    // insert a spreeknaam
    insert: function(newData, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let spreeknamen = JSON.parse(data);
                spreeknamen.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(spreeknamen), function(err) {
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
    // update a spreeknaam
    update: function(newData, naam, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let spreeknamen = JSON.parse(data);
                let spreeknaam = spreeknamen.find(s => s.naam == naam);
                if (spreeknaam) {
                    Object.assign(spreeknaam, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(spreeknamen), function(err) {
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
    // delete a spreeknaam
    delete: function(naam, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let spreeknamen = JSON.parse(data);
                let index = spreeknamen.findIndex(s => s.naam == naam);
                if (index >= 0) {
                    spreeknamen.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(spreeknamen), function(err) {
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

module.exports = spreeknamenRepo;
