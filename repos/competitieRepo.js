const fs = require('fs');
const DIR_NAME = './assets/comps';

const competitieRepo = {
    // get all competitie names
    dirList: function(resolve) {
        let names = fs.readdirSync(DIR_NAME);
        resolve(names);
    },
    // get competitie
    get: function(fileName, resolve, reject) {
        const filePath = DIR_NAME + '/' + fileName + '.json';
        fs.readFile(filePath, function(err, data) {
            if (err) {
                if (err.message.includes('no such file or directory')) {
                    let resp = {
                        gevonden: false,
                        comp: {}
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
                    comp: JSON.parse(data)
                };
                resolve(resp);
            }
        });
    },
    // save match
    save: function(fileName, newData, resolve, reject) {
        const filePath = DIR_NAME + '/' + fileName + '.json';
        fs.writeFile(filePath, JSON.stringify(newData, undefined, 4), function(err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(newData);
            }
        });
    },
    // delete match
    delete: function(fileName, resolve, reject) {
        const filePath = DIR_NAME + '/' + fileName + '.json';
        fs.unlink(filePath, function(err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
             }
        });
    }
};

module.exports = competitieRepo;
