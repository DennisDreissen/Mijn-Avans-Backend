#!/bin/bash

certbot certonly --webroot -w /var/www/html -d mijnavans-app.nl -d www.mijnavans-app.nl
