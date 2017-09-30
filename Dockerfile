FROM node:4
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm config set registry https://registry.npmjs.org

RUN npm cache clean

RUN npm install

COPY . /usr/src/app

EXPOSE 3030
ENV DEBUG=combo-order

CMD [ "npm", "start" ]
