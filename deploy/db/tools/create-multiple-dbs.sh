#!/bin/sh
# Shell strict mode:
# - Abort if process return non-zero exit code
# - Show undefined variable error
# - Abort pipeline if process return non-zero exit code
set -euo pipefail

function pathMapper() {
    local database=$1
    case "$database" in
        "d_main") echo "backend"
        ;;
        "second") echo "another-service..."
        ;;
    esac
}

function create_user_and_database() {
    local database=$1
    if [ "$database" != 'd_main' ]; then
        echo "	Creating database '$database'	"
        createdb -U $POSTGRES_USER $database
    fi
    psql -U $POSTGRES_USER -d $database -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
}

function apply_structure_dumps() {
    local database=$1
    local location=$2
    echo "	Applying STRUCTURE dumps for '$database'	"
    psql -U $POSTGRES_USER -d $database -f /opt/app/apps/$location/src/dumps/structure/$database.sql
}

function apply_data_dumps() {
    local database=$1
    local location=$2
    echo "	Applying DATA dumps for '$database'	"
    psql -U $POSTGRES_USER -d $database -f /opt/app/apps/$location/src/dumps/data/$database.sql
}

function apply_seeds_dumps() {
    local database=$1
    local location=$2
    echo "	Applying SEEDS dumps for '$database'	"
    psql -U $POSTGRES_USER -d $database -f /opt/app/apps/$location/src/dumps/seeds/$database.sql
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
    echo "  Multiple database creation requested:   "
    for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
        create_user_and_database $db
        apply_structure_dumps $db $(pathMapper $db)
        apply_data_dumps $db $(pathMapper $db)
        apply_seeds_dumps $db $(pathMapper $db)
    done
    echo "  Multiple databases created  "
fi
