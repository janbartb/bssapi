let fs = require('fs');
const os = require('os');
const FILE_NAME = './assets/accounts.json';

let accountRepo = {
    // get all accounts
    get: function(resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let accounts = JSON.parse(data);
                if (accounts.length) {
                    accounts[0].host = os.hostname();
                }
                else {
                    accounts.push({
                        "userId": "",
                        "password": "",
                        "role": "gebruiker",
                        "lastLogin": "",
                        "verId": "",
                        "klasse": "",
                        "dlw": "",
                        "activatieCode": "",
                        "host": os.hostname()
                    });
                }
                resolve(accounts);
            }
        });
    },
    // get one account
    getById: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let foundAccount = JSON.parse(data).find((account) => { return account.userId == id });
                resolve(foundAccount);
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
                let accounts = JSON.parse(data);
                if (searchObject) {
                    // Example search object
                    // let searchObject = {
                    //     "verId": "bvd"
                    // };
                    accounts = accounts.filter((account) => {
                        if (searchObject.verId) {
                            return account.verenigingIds.some(id => id == searchObject.verId);
                        }
                        return false;
                    });
                }
                resolve(accounts);
            }
        });
    },
    // insert an account
    insert: function(newData, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let accounts = [];
                accounts.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(accounts, undefined, 4), function(err) {
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
    // update an account
    update: function(newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let accounts = JSON.parse(data);
                if (Array.isArray(newData)) {
                    newData.forEach(acc => {
                        let account = accounts.find(a => a.userId == acc.userId);
                        if (account) {
                            Object.assign(account, acc);
                        }
                    });
                    fs.writeFile(FILE_NAME, JSON.stringify(accounts, undefined, 4), function(err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(newData);
                        }
                    });                    
                }
                else {
                    let account = accounts.find(s => s.userId == id);
                    if (account) {
                        Object.assign(account, newData);
                        fs.writeFile(FILE_NAME, JSON.stringify(accounts, undefined, 4), function(err) {
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
    // delete an account
    delete: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let accounts = JSON.parse(data);
                let index = accounts.findIndex(s => s.userId == id);
                if (index >= 0) {
                    accounts.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(accounts, undefined, 4), function(err) {
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

module.exports = accountRepo;
