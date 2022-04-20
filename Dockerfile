FROM node:16-alpine as builder

RUN addgroup -S destiny && adduser -S destiny -G destiny

WORKDIR /opt/app

# Update path with /opt/app/node_modules/.bin for binaries lookup
ENV PATH /opt/app/node_modules/.bin:$PATH
# ENV NODE_PATH /opt/app/node_modules/:$NODE_PATH
ENV NODE_ENV=developmnet

# Common dependencies
RUN set -x && \
    apk --no-cache --virtual build-dependencies add \
    git \
    python3 \
    make \
    g++

# Common scripts
COPY ./deploy/scripts/wait-for.sh /bin/wait-for
RUN chmod +x /bin/wait-for

# We copy package.json just to have at least one success copy in case .yarn-cache not exists
ADD package.json ./.yarn-cache/* /

COPY ["jest.config.base.js", "package.json", "yarn.lock", "lerna.json", "tslint.json", ".eslintrc.js", "tsconfig.json", "tsconfig.eslint.json", "tsconfig.build.json", "./"]


# ##########
# # START: Modules stage
# ##########
FROM builder as modules

WORKDIR /opt/app/modules/

COPY modules/ ./

# Install dependencies for modules
RUN set -x && \
    yarn install --pure-lockfile

RUN set -x && \
    cd ./Interfaces && \
    npm run build

RUN set -x && \
    cd ./JWTVerification && \
    npm run build

RUN set -x && \
    cd ./Logger && \
    npm run build

RUN set -x && \
    cd ./NestCQRS && \
    npm run build

RUN set -x && \
    cd ./PermissionsRoles && \
    npm run build


# ##########
# # START: Workspace configuration stage
# ##########
FROM builder as workspace

COPY apps/ /opt/app/apps/
COPY modules/ /opt/app/modules/

# Install dependencies for apps and modules
RUN set -x && \
    yarn install --pure-lockfile



