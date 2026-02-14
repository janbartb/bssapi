let fs = require('fs');
const FILE_NAME = './assets/competities.json';

let competitiesRepo = {
    // get all competities
    get: function(resolve, reject) {
        if (fs.existsSync(FILE_NAME)) {
            fs.readFile(FILE_NAME, function(err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(JSON.parse(data));
                }
            });    
        }
        else {
            try {
                fs.mkdirSync('./assets/comps', { recursive: true });
                fs.writeFileSync(FILE_NAME, '[]');
                resolve(JSON.parse('[]'));
            }
            catch(err) {
                console.log('dir created error');
                reject(err);
            }
        }
    },
    // get one competitie
    getByNaam: function(naam, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let foundCompetitie = JSON.parse(data).find((comp) => { return comp.cmpNaam == naam });
                resolve(foundCompetitie);
            }
        });
    },
    // insert a competitie
    insert: function(newData, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let competities = JSON.parse(data);
                competities.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(competities, undefined, 4), function(err) {
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
    // update a competitie
    update: function(newData, naam, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let competities = JSON.parse(data);
                let competitie = competities.find(s => s.cmpNaam == naam);
                if (competitie) {
                    Object.assign(competitie, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(competities, undefined, 4), function(err) {
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
    // delete a competitie
    delete: function(naam, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let competities = JSON.parse(data);
                let index = competities.findIndex(s => s.cmpNaam == naam);
                if (index >= 0) {
                    competities.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(competities, undefined, 4), function(err) {
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

module.exports = competitiesRepo;
