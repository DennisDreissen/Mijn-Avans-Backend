/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

const request = require('request');
const moment = require('moment-timezone');

function Line() {
    Line.prototype.destination = '';
    Line.prototype.line = '';
    Line.prototype.expectedArrivalTime = '';
    Line.prototype.targetArrivalTime = '';
    Line.prototype.journeyCode = '';
    Line.prototype.status = '';
}

module.exports = {
    getLinesFromStop: (stopId, callback) => {
        request(`http://v0.ovapi.nl/stopareacode/${stopId}/departures`, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let data = JSON.parse(body);
                let lines = [];

                for (stopId in data) {
                    for (var stopArea in data[stopId]) {
                        let passes = data[stopId][stopArea].Passes;

                        for (var journeyCode in passes) {
                            let lineData = passes[journeyCode];
                            let obj = new Line();

                            obj.destination = lineData.DestinationName50;
                            obj.line = lineData.LinePublicNumber;
                            obj.status = lineData.TripStopStatus;
                            obj.journeyCode = journeyCode;
                            obj.expectedArrivalTime = moment.tz(lineData.ExpectedArrivalTime, 'Europe/Amsterdam').format();
                            obj.targetArrivalTime = moment.tz(lineData.TargetArrivalTime, 'Europe/Amsterdam').format();

                            lines.push(obj);
                        }
                    }
                }

                lines.sort((a, b) => { return Date.parse(a.expectedArrivalTime) - Date.parse(b.expectedArrivalTime); });
                callback(null, lines);
                return;
            }

            callback(null, null);
        });
    }
};
