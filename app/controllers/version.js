/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

const mysql = require('../MySQL').pool;

module.exports = {
    get: (request, reply) => {
        require('../models/version').getAll((error, data) => {
            if (error || data.length === 0) {
                reply([]);
                return console.log(error);
            }
            
            reply(data[0]);
        });
    }
};
