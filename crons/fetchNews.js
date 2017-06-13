/* jshint node: true */
/* jshint esversion: 6 */

/**
 * @ Dennis Dreissen
 * @ Licensed under the GNU General Public License v3.0. See the LICENCE file for more information.
 */

'use strict';

require('dotenv').config({path: '../.env'});

const request    = require('request');
const mysql      = require('mysql');
const cheerio    = require('cheerio');
const crypto     = require('crypto');
const moment     = require('moment');
const feedParser = require('../libraries/feed-read-parser');

const feeds   = {
    frontpage: 'https://punt.avans.nl/feed/',
    education: 'https://punt.avans.nl/onderwerp/onderwijs/feed/',
    international: 'https://punt.avans.nl/onderwerp/international/feed/',
    lifestyle: 'https://punt.avans.nl/onderwerp/lifestyle/feed/',
    dossier: 'https://punt.avans.nl/onderwerp/dossiers/feed/'
};

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

let queries = 0;

for (let feedName in feeds) {
    let feed = feeds[feedName];

    var options = {
        url: feed,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/602.4.8 (KHTML, like Gecko) Version/10.0.3 Safari/602.4.8'
        }
    };

    console.log(`Downloading feed: ${feedName}`);

    request(options, (error, response, body) => {
        if (error) return console.log(error);

        feedParser.rss(body, (error, articles) => {
            if (error) return console.log(error);

            console.log(`Parsing feed: ${feedName}`);

            for (let i in articles) {
                let article = articles[i];

                let guid = crypto.createHash('md5').update(article.guid).digest('hex');
                let date = moment.utc(article.published).format('DD-MM-YYYY');

                let content = `<!DOCTYPE html><html lang="en"><head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
                <style>iframe{max-width: 100%;}div{max-width: 100%;}blockquote,p{display:block;-webkit-margin-before:1em;-webkit-margin-after:1em;margin-top:1.5rem;margin-bottom:1.5rem}.title,blockquote,img,p{display:block}.title,body{font-family:sans-serif}body{color:#333332;font-size:.9375rem;line-height:1.5em;word-break:break-word;-webkit-font-smoothing:antialiased}img{margin-top:2rem;margin-bottom:2rem;border-radius:3px;border:1px solid #efefef;width:100%;height:auto}a{color:inherit;text-decoration:none;border-bottom:1px solid #CCC}p{-webkit-margin-start:0;-webkit-margin-end:0}blockquote{-webkit-margin-start:40px;-webkit-margin-end:40px;font-style:italic;margin-left:1.5rem}.title{font-size:1.6695652173913044rem;font-weight:700;text-rendering:optimizeLegibility;line-height:2.15rem;text-transform:none;clear:both;margin-top:1rem;letter-spacing:-.04em;margin-bottom:0}.metadata{color:#A0A0A0;font-size:12px;line-height:17px;overflow:hidden;margin-top:-20px}</style>
                </head>
                <body>
                <div class="title">${article.title}</div><br>
                <div class="metadata">door ${article.author} / ${date}</div>
                ${article.content}
                </body>
                </html>`;

                content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                content = content.replace(/<p>\s*<\/p>/, '');

                const $ = cheerio.load(article.content);

                if (!$) continue;

                let c = $('img');

                let srcset;
                let image;

                if (c[0] && c[0].attribs) {
                    srcset = c[0].attribs.srcset;
                    image = c[0].attribs.src;
                }

                if (srcset) {
                    let _srcset = srcset.split(',');

                    if (_srcset.length > 0) {
                        _srcset = _srcset[0].split(' ');
                        if (_srcset.length > 0) {
                            image = _srcset[0];
                        }
                    }
                }

                if (!image || !image.includes('https://punt.avans.nl')) image = null;

                queries++;

                connection.query('INSERT INTO article (id, title, author, link, image, date, message) VALUES(?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=VALUES(id), title=VALUES(title), author=VALUES(author), link=VALUES(link), image=VALUES(image), date=VALUES(date), message=VALUES(message)',
                [guid, article.title, article.author, article.link, image, article.published, content], (error, results, fields) => {
                    queries--;

                    if (error) return console.log(error, content);

                    queries++;

                    connection.query('INSERT INTO article_category (id, category) VALUE(?, ?)', [guid, feedName], (error, results, fields) => {
                        queries--;
                        if (queries === 0) connection.end();
                    });

                    console.log(`Insterting article: ${guid}`);
                });
            }
        });
    });
}
