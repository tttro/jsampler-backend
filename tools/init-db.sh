#!/bin/bash
export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/latest/bin
psql -a -f ./tools/init-database.sql
