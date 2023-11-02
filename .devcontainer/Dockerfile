FROM mcr.microsoft.com/devcontainers/javascript-node:20
RUN USER=$(id --user --name 1000) && \
    usermod --login dev --home /home/dev --move-home ${USER} && \
    groupmod --new-name dev ${USER}

USER dev
WORKDIR /home/dev
COPY .env .
RUN . ./.env && mkdir --parents ${XDG_CONFIG_HOME} ${XDG_CACHE_HOME} ${XDG_DATA_HOME} ${XDG_STATE_HOME} ${WORKSPACE}

RUN npm install --global pnpm@8.10.0
