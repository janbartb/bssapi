const fs = require('fs');
const FILE_NAME = './assets/teams.json';

const teamRepo = {
    // get all teams
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
    // get one team
    getById: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let foundTeam = JSON.parse(data).find((team) => { return team.id == id });
                resolve(foundTeam);
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
                let teams = JSON.parse(data);
                if (searchObject) {
                    // Example search object
                    // let searchObject = {
                    //     "id": 1,
                    //     "naam": 'A'
                    // };
                    teams = teams.filter((team) => {
                        return (searchObject.id ? team.id == searchObject.id : true) && 
                                (searchObject.naam ? team.naam.toLowerCase().indexOf(searchObject.naam.toLowerCase()) >= 0 : true) &&
                                (searchObject.spelsoort ? team.spelsoort == searchObject.spelsoort : true);
                    });
                }
                resolve(teams);
            }
        });
    },
    // insert a team
    insert: function(newData, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let teams = JSON.parse(data);
                teams.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(teams), function(err) {
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
    // update a team
    update: function(newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let teams = JSON.parse(data);
                let team = teams.find(t => t.id == id);
                if (team) {
                    Object.assign(team, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(teams), function(err) {
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
    // delete a team
    delete: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let teams = JSON.parse(data);
                let index = teams.findIndex(t => t.id == id);
                if (index >= 0) {
                    teams.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(teams), function(err) {
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

module.exports = teamRepo;
