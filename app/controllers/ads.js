/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

module.exports = {
    shouldShow: (request, reply) => {
        if (!request.params.id || request.params.id.length == 0) {
            return reply({shouldDisplayAds: true});
        }

        require('../models/ads').exists("*", (displayAds) => {
            if (displayAds == false) return reply({shouldDisplayAds: displayAds});

            require('../models/ads').exists(request.params.id || null, (displayAds) => {
            	return reply({shouldDisplayAds: displayAds});
        	});
        });
    }
};