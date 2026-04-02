# syntax=docker/dockerfile:1

FROM node:24 AS dev
WORKDIR /root/front

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
CMD yarn install && yarn dev

FROM dev AS build

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .
RUN yarn install && yarn cache clean

COPY --chown=node:node --from=hl_common . ../haven/src/hl-common
COPY --chown=node:node --from=prisma . ../haven/prisma

RUN ln -s ../haven/prisma prisma
RUN yarn prisma generate

COPY --chown=node:node . .

ARG NEXT_PUBLIC_HAVEN_URL
ENV NEXT_PUBLIC_HAVEN_URL=${NEXT_PUBLIC_HAVEN_URL}
ARG NEXT_PUBLIC_FRONTEND_URL
ENV NEXT_PUBLIC_FRONTEND_URL=${NEXT_PUBLIC_FRONTEND_URL}

RUN yarn build

FROM node:24 AS release
USER node
WORKDIR /app

COPY --from=build /root/front/.next/standalone/front ./
COPY --from=build /root/front/.next/static ./.next/static

FROM release AS prod
EXPOSE 3000
CMD ["node", "server.js"]
