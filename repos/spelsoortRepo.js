let fs = require('fs');
const FILE_NAME = './assets/spelsoorten.json';

let spelsoortRepo = {
    // get all spelsoorten
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
    // get one spelsoort
    getById: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let foundSpelsoort = JSON.parse(data).find((soort) => { return soort.spelsoortId == id });
                resolve(foundSpelsoort);
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
                let spelsoorten = JSON.parse(data);
                if (searchObject) {
                    // Example search object
                    // let searchObject = {
                    //     "id": "1",
                    //     "naam": 'A',
                    // };
                    spelsoorten = spelsoorten.filter((spelsoort) => {
                        if (searchObject.id && spelsoort.spelsoortId != searchObject.id) {
                            return false;
                        }
                        if (searchObject.naam && spelsoort.spelsoortNaam.toLowerCase().indexOf(searchObject.naam.toLowerCase()) < 0) {
                            return false;
                        }
                        return true;
                    });
                }
                resolve(spelsoorten);
            }
        });
    },
    // insert a spelsoort
    insert: function(newData, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let spelsoorten = JSON.parse(data);
                spelsoorten.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(spelsoorten, undefined, 4), function(err) {
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
    // update a spelsoort
    update: function(newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let spelsoorten = JSON.parse(data);
                let spelsoort = spelsoorten.find(s => s.spelsoortId == id);
                if (spelsoort) {
                    Object.assign(spelsoort, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(spelsoorten, undefined, 4), function(err) {
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
    // delete a spelsoort
    delete: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let spelsoorten = JSON.parse(data);
                let index = spelsoorten.findIndex(s => s.spelsoortId == id);
                if (index >= 0) {
                    let spelsoort = spelsoorten[index];
                    spelsoorten.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(spelsoorten, undefined, 4), function(err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(spelsoort);
                        }
                    });
                }
             }
        });
    }

};

module.exports = spelsoortRepo;
