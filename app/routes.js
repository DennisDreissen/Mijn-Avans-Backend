/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */

'use strict';

module.exports = (server) => {

    /*
     * Transport.
     */

    // Returns all the stops.
    server.route({
        method: 'GET',
        path: '/v0/transport/stops',
        handler: require('./controllers/transport').stops
    });

    // Returns all the lines passing a certain stop.
    server.route({
        method: 'GET',
        path: '/v0/transport/lines/{stopId}',
        handler: require('./controllers/transport').lines
    });

    // Returns the journey data from a certain line.
    server.route({
        method: 'GET',
        path: '/v0/transport/lines/{stopId}/journey/{journeyId}',
        handler: require('./controllers/transport').journey
    });

    /*
     * Punt News.
     */

     // Returns all the articles from a category.
     server.route({
         method: 'GET',
         path: '/v0/news/articles/category/{category}',
         handler: require('./controllers/news').articles
     });

     // Returns the article from an id.
     server.route({
         method: 'GET',
         path: '/v0/news/articles/{articleId}',
         handler: require('./controllers/news').article
     });

     /*
      * General.
      */

      // Returns version information for the app.
      server.route({
          method: 'GET',
          path: '/v0/version',
          handler: require('./controllers/version').get
      });

	    // Returns details about popups to show.
	    server.route({
	        method: 'GET',
	        path: '/v0/popup',
	        handler: require('./controllers/popup').get
	    });

	    // Returns a booleon
	    server.route({
	        method: 'GET',
	        path: '/v0/killswitch',
	        handler: require('./controllers/killswitch').get
	    });

      // Returns messages for the app, defaults to the Dutch language.
      // **
      // ** DEPRECATED
      // **
      server.route({
          method: 'GET',
          path: '/v0/messages',
          handler: require('./controllers/messages').get
      });

      // Returns messages for the app in a certain language and for a certain platform.
      server.route({
          method: 'GET',
          path: '/v0/messages/{language}/{platform?}',
          handler: require('./controllers/messages').get
      });

      /*
      * Ads.
      */

      // Returns a boolean whether ads should be shown to the user.
      server.route({
          method: 'GET',
          path: '/v0/ads/{id}',
          handler: require('./controllers/ads').shouldShow
      });

      /*
      * Logs.
      */

      // Creates a new log enty in the database.
      server.route({
          method: 'POST',
          path: '/v0/log',
          handler: require('./controllers/log').create
      });
};