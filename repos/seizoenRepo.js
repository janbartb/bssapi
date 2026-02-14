const fs = require('fs');
const FILE_NAME = './assets/seizoenen.json';

const seizoenRepo = {
    // get seizoenen
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
    // save seizoenen
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

module.exports = seizoenRepo;
