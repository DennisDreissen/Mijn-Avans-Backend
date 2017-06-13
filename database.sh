#!/bin/bash

DB_USER=""
DB_NAME=""
DB_PASS=""

while read -r line
do
    if [[ $line == *"DB_USER"* ]]; then
        DB_USER=$(echo $line | cut -d "=" -f2-)
    fi

    if [[ $line == *"DB_NAME"* ]]; then
        DB_NAME=$(echo $line | cut -d "=" -f2-)
    fi

    if [[ $line == *"DB_PASS"* ]]; then
        DB_PASS=$(echo $line | cut -d "=" -f2-)
    fi
done < ".env"

echo "CREATE DATABASE IF NOT EXISTS $DB_NAME" | mysql -u $DB_USER -p$DB_PASS
mysql -u $DB_USER -p$DB_PASS $DB_NAME < database.sql
