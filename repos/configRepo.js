const fs = require('fs');
const FILE_NAME = './assets/config.json';

const configRepo = {
    exists: function(resolve) {
        if (fs.existsSync(FILE_NAME)) {
            resolve(true);
        }
        else {
            resolve(false);
        }
    },
    // get config
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
    // save config
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
};

module.exports = configRepo;
