/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

const categories = ['frontpage', 'education', 'international', 'lifestyle', 'dossier'];

module.exports = {
    articles: (request, reply) => {
        if (request.params.category && categories.includes(encodeURIComponent(request.params.category))) {
            require('../models/article').getArticlesFromCategory(encodeURIComponent(request.params.category), (error, data) => {
                if (error) {
                    reply([]);
                    return console.log(error);
                }

                reply(data);
            });
        } else {
            reply([]);
        }
    },

    article: (request, reply) => {
        if (!request.params.articleId) return reply([]);
        
        require('../models/article').getArticleFromId(encodeURIComponent(request.params.articleId), (error, data) => {
            if (error) {
                reply([]);
                return console.log(error);
            }

            reply(data).type('text/html');
        });
    },
};
