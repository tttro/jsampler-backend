#!/bin/bash


echo -e '\n -- Running migrations\n'
source .env


./node_modules/.bin/knex migrate:rollback
./node_modules/.bin/knex migrate:latest


echo -e '\n -- End of migrations\n'


