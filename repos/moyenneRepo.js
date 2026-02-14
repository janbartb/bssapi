let fs = require('fs');
const FILE_NAME = './assets/moyennes.json';

let moyenneRepo = {
    // get alle moyenne tabellen
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
    // get een moyenne tabel
    getById: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let foundTabel = JSON.parse(data).find((tabel) => { return tabel.tabId == id });
                resolve(foundTabel);
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
                let tabellen = JSON.parse(data);
                if (searchObject) {
                    // Example search object
                    // let searchObject = {
                    //     "spelId": "3BA"
                    // };
                    tabellen = tabellen.filter((tabel) => {
                        if (searchObject.spelId) {
                            return tabel.spelsoort == searchObject.spelId;
                        }
                        return false;
                    });
                }
                resolve(tabellen);
            }
        });
    },
    // insert een tabel
    insert: function(newData, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let tabellen = JSON.parse(data);
                tabellen.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(tabellen, undefined, 4), function(err) {
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
    // update een tabel
    update: function(newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let tabellen = JSON.parse(data);
                let tabel = tabellen.find(t => t.tabId == id);
                if (tabel) {
                    Object.assign(tabel, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(tabellen, undefined, 4), function(err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(tabel);
                        }
                    });
                }
             }
        });
    },
    // delete een tabel
    delete: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let tabellen = JSON.parse(data);
                let index = tabellen.findIndex(t => t.tabId == id);
                if (index >= 0) {
                    tabellen.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(tabellen, undefined, 4), function(err) {
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

module.exports = moyenneRepo;
