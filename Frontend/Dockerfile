FROM node:10-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
CMD ["dockerize", "-wait http://172.25.0.29:8181/MantenimientoTPI-web"]
ENTRYPOINT node server.js
EXPOSE 3000