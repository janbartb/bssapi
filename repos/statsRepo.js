let fs = require('fs');
const FILE_NAME = './assets/stats.json';

let statsRepo = {
    exists: function(resolve) {
        if (fs.existsSync(FILE_NAME)) {
            resolve(true);
        }
        else {
            resolve(false);
        }
    },
    stats: function(resolve, reject) {
        fs.stat(FILE_NAME, function(err, stats){
            if (err) {
                reject(err);
            }
            else{
                resolve(stats);
            }
        });
    },
    create: function(resolve, reject) {
        fs.writeFile(FILE_NAME, "{}", function(err) {
            if (err) {
                reject(err);
            }
            else {
                fs.stat(FILE_NAME, function(err, stats){
                    if (err) {
                        reject(err);
                    }
                    else{
                        resolve(stats);
                    }
                });
            }
        });
    }
};

module.exports = statsRepo;
