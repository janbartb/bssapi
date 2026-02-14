const fs = require('fs');
const FILE_NAME = './assets/teammatch.json';

const teammatchRepo = {
    // get match
    get: function(resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                if (err.message.includes('no such file or directory')) {
                    let resp = {
                        gevonden: false,
                        match: {}
                    };
                    resolve(resp);
                }
                else {
                    reject(err);
                }
            }
            else {
                let resp = {
                    gevonden: true,
                    match: JSON.parse(data)
                };
                resolve(resp);
            }
        });
    },
    // save match
    save: function(newData, resolve, reject) {
        fs.writeFile(FILE_NAME, JSON.stringify(newData, undefined, 4), function(err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(newData);
            }
        });
    },
    // delete match
    delete: function(resolve, reject) {
        fs.delete(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
             }
        });
    }
};

module.exports = teammatchRepo;
