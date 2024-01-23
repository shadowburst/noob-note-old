FROM node:lts as node
FROM rust:buster

ARG USERID=1000
ARG GROUPID=1000

RUN apt-get update -y \
    && apt-get upgrade -y \
    && apt-get install -y build-essential curl wget file libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev \
    && apt-get clean

COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

WORKDIR /app

RUN groupadd -g ${GROUPID} user \
    && useradd -l -u ${USERID} user -g ${GROUPID} \
    && mkdir /home/user \
    && chown user:user /home/user

USER user

