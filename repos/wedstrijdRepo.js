const fs = require('fs');
const FILE_NAME = './assets/wedstrijd.json';

const wedstrijdRepo = {
    // get wedstrijd
    get: function(resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                if (err.message.includes('no such file or directory')) {
                    let resp = {
                        gevonden: false,
                        wedstrijd: {}
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
                    wedstrijd: JSON.parse(data)
                };
                resolve(resp);
            }
        });
    },
    // save wedstrijd
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
    // delete wedstrijd
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

module.exports = wedstrijdRepo;
