/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

const mysql = require('../MySQL').pool;

module.exports = {
    getAll: (language, platform, callback) => {
        if (!language) language = 'nl';
        if (!platform) platform = 'iOS';

        mysql.getConnection((error, connection) => {
            if (error) return console.log(error);

            connection.query("SELECT * FROM message WHERE language = ? AND platform = ?", [language, platform], (error, rows) => {
                connection.release();

                if (error || !rows) return callback(error, rows);

                for (var i in rows) {
                    delete rows[i].language;
                    delete rows[i].platform;
                }

                callback(error, rows);
            });
        });
    }
};
