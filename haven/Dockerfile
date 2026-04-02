# syntax=docker/dockerfile:1

FROM node:24 AS dev
WORKDIR /root/haven

ARG CONTAINER_USER_ID=1000
ARG CONTAINER_GROUP_ID=1000
RUN if [ "$(id -u node)" != "$CONTAINER_USER_ID" ] || [ "$(id -g node)" != "$CONTAINER_GROUP_ID" ]; then \
      usermod -u $CONTAINER_USER_ID node && \
      groupmod -g $CONTAINER_GROUP_ID node && \
      chown -Rh --from=1000 $CONTAINER_USER_ID /home/node && \
      chown -Rh --from=:1000 :$CONTAINER_GROUP_ID /home/node; \
    fi

RUN chown -R node:node /root
USER node

CMD yarn install && yarn run start:dev

FROM dev AS build

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .
RUN yarn install && yarn cache clean

COPY --chown=node:node prisma prisma

RUN yarn prisma generate

COPY --chown=node:node . .

RUN yarn build

FROM build AS prod
EXPOSE 2337
CMD yarn run start:prod
