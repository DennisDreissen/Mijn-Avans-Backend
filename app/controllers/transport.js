/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

const constants = require('../constants');
const cache = require('../helpers/cacheManager');
const crypto = require('crypto');

module.exports = {
    stops: (request, reply) => {
        reply(constants.stops);
    },

    lines: (request, reply) => {
        const url = crypto.createHash('md5').update('lines/' + encodeURIComponent(request.params.stopId)).digest('hex');

        cache.get(url, 60, (cachedData) => {
            if (cachedData) {
                console.log("Serving cache line " + encodeURIComponent(request.params.stopId));
                return reply(cachedData);
            }

            require('../models/transport/line').getLinesFromStop(encodeURIComponent(request.params.stopId), (error, result) => {
                console.log("Requesting line " + encodeURIComponent(request.params.stopId));

                if (result) {
                    cache.set(url, result);
                    return reply(result);
                }

                reply([]);
            });
        });
    },

    journey: (request, reply) => {
        const url = crypto.createHash('md5').update('journey/' + encodeURIComponent(request.params.journeyId) + '/' + encodeURIComponent(request.params.stopId)).digest('hex');

        cache.get(url, 120, (cachedData) => {
            if (cachedData) {
                console.log("Serving cache journey " + encodeURIComponent(request.params.journeyId));
                return reply(cachedData);
            }

            require('../models/transport/journey').getJourneyFromId(encodeURIComponent(request.params.journeyId), encodeURIComponent(request.params.stopId), (error, result) => {
                console.log("Requesting journey " + encodeURIComponent(request.params.journeyId));

                if (result) {
                    cache.set(url, result);
                    return reply(result);
                }

                reply([]);
            });
        });
    }
};
