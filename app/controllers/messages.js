/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

module.exports = {
    get: (request, reply) => {
        require('../models/message').getAll(request.params.language || null, request.params.platform || null, (error, data) => {
            if (error) {
                reply([]);
                return console.log(error);
            }
            
            reply(data);
        });
    }
};
