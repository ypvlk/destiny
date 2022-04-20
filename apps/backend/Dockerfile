FROM modules as backend-dev

WORKDIR /opt/app/apps/backend

COPY ./package.json .
RUN set -x && \
    yarn workspace destiny-backend install --pure-lockfile

COPY ./entrypoint.dev.sh /bin/entrypoint.dev.sh
RUN chmod +x /bin/entrypoint.dev.sh

USER destiny

COPY ./ ./

CMD /bin/entrypoint.dev.sh

# ##########
# START: Builder stage
# ##########
FROM backend-dev as backend-built

USER root

COPY ./tsconfig.json ./tsconfig.build.json ./

COPY ./src ./src

RUN set -x && \
    npm run build

# ##########
# START: Production image instructions stage
# ##########
FROM node:16-alpine as backend-prod

ENV NODE_ENV=production

WORKDIR /backend

COPY --from=modules /opt/app/yarn.lock ./
COPY ./package.json ./

RUN set -x && \
    apk --no-cache --virtual build-dependencies add git \
    python3 \
    make \
    g++ && \
    yarn install --pure-lockfile --production && \
    apk del build-dependencies

COPY --from=backend-built /opt/app/apps/backend/dist/ ./

COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT ["sh", "/entrypoint.sh"]