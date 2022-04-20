FROM postgres:11-alpine

COPY ./deploy/db/tools/create-multiple-dbs.sh /docker-entrypoint-initdb.d
COPY ./deploy/db/postgres.conf /etc/postgresql/postgresql.conf

# COPY ./apps/backend/src/dumps /opt/app/apps/backend/src/dumps