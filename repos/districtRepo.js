let fs = require('fs');
const FILE_NAME = './assets/districten.json';

let districtRepo = {
    // get all districten
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
    // get one district
    getById: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let foundDistrict = JSON.parse(data).find((dist) => { return dist.disId == id });
                resolve(foundDistrict);
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
                let districten = JSON.parse(data);
                if (searchObject) {
                    // Example search object
                    // let searchObject = {
                    //     "id": "1",
                    //     "naam": 'A',
                    // };
                    districten = districten.filter((district) => {
                        if (searchObject.id && district.disId != searchObject.id) {
                            return false;
                        }
                        if (searchObject.naam && district.disNaam.toLowerCase().indexOf(searchObject.naam.toLowerCase()) < 0) {
                            return false;
                        }
                        return true;
                    });
                }
                resolve(districten);
            }
        });
    },
    // insert a district
    insert: function(newData, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let districten = JSON.parse(data);
                districten.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(districten, undefined, 4), function(err) {
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
    // update a district
    update: function(newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let districten = JSON.parse(data);
                let district = districten.find(dist => dist.disId == id);
                if (district) {
                    Object.assign(district, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(districten, undefined, 4), function(err) {
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
    // delete a district
    delete: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let districten = JSON.parse(data);
                let index = districten.findIndex(dist => dist.disId == id);
                if (index >= 0) {
                    let district = districten[index];
                    districten.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(districten, undefined, 4), function(err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(district);
                        }
                    });
                }
             }
        });
    }

};

module.exports = districtRepo;
