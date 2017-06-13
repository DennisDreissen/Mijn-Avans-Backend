/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

const mysql = require('../MySQL').pool;

module.exports = {
    getAll: (callback) => {
        mysql.getConnection((error, connection) => {
            connection.query("SELECT * FROM version", (error, rows) => {
                connection.release();
                callback(error, rows);
            });
        });
    }
};
