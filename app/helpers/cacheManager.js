/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

const constants = require('../constants');
const fs = require('fs');

module.exports = {
    set: (id, content) => {
        if (!id || !content || !JSON.stringify(content)) return;

        fs.readdir(constants.cacheDir, (err, files) => {
            let date = new Date().getTime();
            let fileName = id + "_" + date;

            for (let i in files) {
                let file = files[i];
                let cacheFileDetails = file.split('_');

                if (cacheFileDetails[0] == id) {
                    fs.unlink(constants.cacheDir + "/" + file, () => {
                        fs.writeFile(constants.cacheDir + "/" + fileName, JSON.stringify(content), (err) => {
                            if(err) return console.log(err);
                        });
                    });

                    return;
                }
            }

            fs.writeFile(constants.cacheDir + "/" + fileName, JSON.stringify(content), (err) => {
                if(err) return console.log(err);
            });
        });
    },

    get: (id, cacheTime, callback) => {
        if (!id) return callback(null);

        fs.readdir(constants.cacheDir, (err, files) => {
            for (let i in files) {
                let file = files[i];
                let cacheFileDetails = file.split('_');

                if (cacheFileDetails[0] == id) {
                    if ((Math.round((new Date() - new Date(parseInt(cacheFileDetails[1]))) / 1000)) > cacheTime) {
                        fs.unlink(constants.cacheDir + "/" + file, () => {
                            callback(null);
                        });

                        return;
                    }

                    fs.readFile(constants.cacheDir + "/" + file, 'utf8', (err, contents) => {
                        callback(contents);
                    });

                    return;
                }
            }

            callback(null);
        });
    }
};
