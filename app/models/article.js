/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */
 
'use strict';

const mysql = require('../MySQL').pool;
const moment = require('moment');

module.exports = {
    getArticlesFromCategory: (category, callback) => {
        mysql.getConnection((error, connection) => {
            if (error) return console.log(error);

            connection.query("SELECT article.*, article_category.category FROM article JOIN article_category ON article.id = article_category.id WHERE category = ? ORDER BY date DESC LIMIT 20", [category], (error, rows) => {
                connection.release();

                if (rows) {
                    for (var i in rows) {
                        rows[i].timestamp = moment.utc(rows[i].date).unix();
                        delete rows[i].message;
                        delete rows[i].category;
                    }
                }

                callback(error, rows);
            });
        });
    },

    getArticleFromId: (id, callback) => {
        mysql.getConnection((error, connection) => {
            if (error) return console.log(error);

            connection.query("SELECT message FROM article WHERE id = ?", [id], (error, rows) => {
                connection.release();

                if (rows && rows.length > 0) {
                    callback(error, rows[0].message);
                    return;
                }

                callback(error, rows);
            });
        });
    }
};
