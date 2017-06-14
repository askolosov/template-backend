FROM node:boron

RUN npm -g install babel-cli

# Create app directory
RUN mkdir -p /usr/src/app && chown node /usr/src/app
WORKDIR /usr/src/app

USER node

# Bundle app source
COPY . /usr/src/app
RUN npm install

EXPOSE 8080
ENV PORT 8080
CMD [ "npm", "start" ]
