/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

const fs = require('fs');

if (!fs.existsSync('../.env')){
    console.log('App could not be started, .env file missing in root directory.');
    process.exit();
}

require('dotenv').config({path: '../.env'});

const Hapi = require('hapi');
const constants = require('./constants');

const server = new Hapi.Server();
const config = {
    port: (process.env.APP_ENV === 'development') ? 8080 : 8000
};

if (process.env.APP_ENV === 'production') {
    config.tls = {
        key: fs.readFileSync(process.env.KEY),
        cert: fs.readFileSync(process.env.CERT)
    };
}

server.connection(config);

if (!fs.existsSync(constants.cacheDir)){
    fs.mkdirSync(constants.cacheDir);
}

require('./routes')(server);

server.start((err) => {
    if (err) throw err;

    console.log(`Server running at: ${server.info.uri}`);
});
