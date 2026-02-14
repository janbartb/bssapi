let fs = require('fs');
const DIR_NAME = './assets/knbb'
const FILE_NAME = '/competities.json';

let knbbCompetitieRepo = {
    // create if not exists
    exists: function(district, spel, resolve, reject) {
        const dirName = DIR_NAME + '/' + district + '/' + spel;
        if (fs.existsSync(dirName)) {
            resolve(true);
        }
        else {
            try {
                fs.mkdirSync(dirName, { recursive: true });
                fs.writeFileSync(dirName + FILE_NAME, '[]');
                resolve(true);
            }
            catch(err) {
                console.log('dir created error');
                reject(err);
            }
        }
    },
    // get alle competities
    get: function(district, spel, resolve, reject) {
        const fileName = DIR_NAME + '/' + district + '/' + spel + FILE_NAME;
        fs.readFile(fileName, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    },
    // get een competitie
    getById: function(district, spel, id, resolve, reject) {
        const fileName = DIR_NAME + '/' + district + '/' + spel + FILE_NAME;
        fs.readFile(fileName, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let foundComp = JSON.parse(data).find((comp) => { return comp.competitieId == id });
                resolve(foundComp);
            }
        });
    },
    // search
    search: function(district, spel, searchObject, resolve, reject) {
        const fileName = DIR_NAME + '/' + district + '/' + spel + FILE_NAME;
        fs.readFile(fileName, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let competities = JSON.parse(data);
                if (searchObject) {
                    // Example search object
                    // let searchObject = {
                    //     "spelId": "3BA"
                    // };
                    competities = competities.filter((comp) => {
                        if (searchObject.spelId) {
                            return comp.spelsoort == searchObject.spelId;
                        }
                        return false;
                    });
                }
                resolve(competities);
            }
        });
    },
    // insert een competitie
    insert: function(district, spel, newData, resolve, reject) {
        const fileName = DIR_NAME + '/' + district + '/' + spel + FILE_NAME;
        fs.readFile(fileName, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let competities = JSON.parse(data);
                competities.push(newData);
                fs.writeFile(fileName, JSON.stringify(competities, undefined, 4), function(err) {
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
    // save alle competities
    save: function(district, spel, newData, resolve, reject) {
        const fileName = DIR_NAME + '/' + district + '/' + spel + FILE_NAME;
        fs.readFile(fileName, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let competities = newData;
                fs.writeFile(fileName, JSON.stringify(competities, undefined, 4), function(err) {
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
    // update een competitie
    update: function(district, spel, newData, id, resolve, reject) {
        const fileName = DIR_NAME + '/' + district + '/' + spel + FILE_NAME;
        fs.readFile(fileName, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let competities = JSON.parse(data);
                let competitie = competities.find(comp => comp.competitieId == id);
                if (competitie) {
                    Object.assign(competitie, newData);
                    fs.writeFile(fileName, JSON.stringify(competities, undefined, 4), function(err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(competitie);
                        }
                    });
                }
             }
        });
    },
    // delete een competitie
    delete: function(district, spel, id, resolve, reject) {
        const fileName = DIR_NAME + '/' + district + '/' + spel + FILE_NAME;
        fs.readFile(fileName, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let competities = JSON.parse(data);
                let index = competities.findIndex(comp => comp.competitieId == id);
                if (index >= 0) {
                    competities.splice(index, 1);
                    fs.writeFile(fileName, JSON.stringify(competities, undefined, 4), function(err) {
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

module.exports = knbbCompetitieRepo;
