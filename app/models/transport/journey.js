/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

const request = require('request');

function JourneyStop() {
    JourneyStop.prototype.timingPointNumber = '';
    JourneyStop.prototype.timingPointName = '';
    JourneyStop.prototype.longitude = '';
    JourneyStop.prototype.latitude = '';
    JourneyStop.prototype.stopId = '';
}

module.exports = {
    getJourneyFromId: (journeyId, stopId, callback) => {
        request(`http://v0.ovapi.nl/journey/${journeyId}`, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let data = JSON.parse(body);
                let journeyStops = [];

                for (journeyId in data) {
                    let stops = data[journeyId].Stops;

                    for (var timingPointNumber in stops) {
                        let obj = new JourneyStop();
                        let journeyStopData = stops[timingPointNumber];

                        obj.timingPointNumber = timingPointNumber;
                        obj.timingPointName = journeyStopData.TimingPointName;
                        obj.longitude = journeyStopData.Longitude;
                        obj.latitude = journeyStopData.Latitude;
                        obj.stopId = journeyStopData.StopAreaCode;

                        journeyStops.push(obj);
                    }
                }

                journeyStops.sort((a, b) => { return a.timingPointNumber - b.timingPointNumber; });

                let obj;
                for (var i in journeyStops) {
                    let j = journeyStops[i];

                    if (j.stopId == stopId) {
                        obj = j;
                        break;
                    }
                }

                for(var k = 0; k < journeyStops.length; k++){
                    let j = journeyStops[k];

                    if(obj && parseInt(j.timingPointNumber) < parseInt(obj.timingPointNumber)){
                        journeyStops.splice(k, 1);
                        k--;
                    } else {
                        delete j.stopId;
                        delete j.timingPointNumber;
                    }
                }

                callback(null, journeyStops);
                return;
            }

            callback(null, null);
        });
    }
};
