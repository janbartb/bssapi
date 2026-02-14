let fs = require('fs');
const FILE_NAME = './assets/lokaliteiten.json';

let lokaliteitRepo = {
    // get all lokaliteiten
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
    // get one lokaliteit
    getById: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let foundLokaliteit = JSON.parse(data).find((lok) => { return lok.lokId == id });
                resolve(foundLokaliteit);
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
                let lokaliteiten = JSON.parse(data);
                if (searchObject) {
                    // Example search object
                    // let searchObject = {
                    //     "id": "1",
                    //     "naam": 'A',
                    // };
                    lokaliteiten = lokaliteiten.filter((lokaliteit) => {
                        if (searchObject.id && lokaliteit.lokId != searchObject.id) {
                            return false;
                        }
                        if (searchObject.naam && lokaliteit.naam.toLowerCase().indexOf(searchObject.naam.toLowerCase()) < 0) {
                            return false;
                        }
                        return true;
                    });
                }
                resolve(lokaliteiten);
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
                let lokaliteiten = JSON.parse(data);
                lokaliteiten.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(lokaliteiten, undefined, 4), function(err) {
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
                let lokaliteiten = JSON.parse(data);
                let lokaliteit = lokaliteiten.find(lok => lok.lokId == id);
                if (lokaliteit) {
                    Object.assign(lokaliteit, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(lokaliteiten, undefined, 4), function(err) {
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
                let lokaliteiten = JSON.parse(data);
                let index = lokaliteiten.findIndex(lok => lok.lokId == id);
                if (index >= 0) {
                    let lokaliteit = lokaliteiten[index];
                    lokaliteiten.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(lokaliteiten, undefined, 4), function(err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(lokaliteit);
                        }
                    });
                }
             }
        });
    }

};

module.exports = lokaliteitRepo;
