#!/bin/sh
DB_SERVICE="main-db"

sh /bin/wait-for --timeout=600 $DB_SERVICE:5432 -- npm run orm:migration:run \
  && npm run start:dev

  #&& npm run orm:seeds:run 
  #&& npm run start:dev
