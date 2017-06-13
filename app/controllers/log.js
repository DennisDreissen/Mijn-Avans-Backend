/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */

'use strict';

module.exports = {
    create: (request, reply) => {
        if (!request.headers || !request.headers.secret || request.headers.secret != process.env.APP_SECRET) {
            return reply('INVALID AUTHORIZATION');
        }

        if (!request.payload || !request.payload.class || !request.payload.comment || !request.payload.details || 
            request.payload.class.length == 0 || request.payload.comment.length == 0 || request.payload.details.length == 0) {
            return reply('INVALID INPUT');
        }

        require('../models/log').create(request.payload || null, (success) => {
            reply((success) ? 'OK' : 'ERROR')
        });
    }
};