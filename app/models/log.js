/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

const mysql = require('../MySQL').pool;

module.exports = {
    create: (data, callback) => {
        mysql.getConnection((error, connection) => {
            connection.query('INSERT INTO log (class, comment, details) VALUES (?, ?, ?)', [data.class, data.comment, data.details], function(error) {
                connection.release();

                if (error) {
                    callback(false);
                } else {
                    callback(true);   
                }
            });
        });
    }
};
