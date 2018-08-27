/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

const mysql = require('../MySQL').pool;

module.exports = {
    exists: (id, callback) => {
        mysql.getConnection((error, connection) => {
            if (error) return console.log(error);
            
            connection.query("SELECT * FROM ads_user WHERE id = ?", [id], (error, rows) => {
                connection.release();

                if (rows && rows.length > 0) {
                    return callback(false);
                }

                callback(true);
            });
        });
    }
};