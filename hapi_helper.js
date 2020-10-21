'use strict';
const Inert = require('@hapi/inert');
const Hapi = require('@hapi/hapi');
const Vision = require('vision');
const path = require('path');
(async()=> {
  try {
    const server = Hapi.Server({
      host: 'localhost',
      port: Number(process.argv[2]||8080)
    });
    await server.register(Inert);
    await server.register(Vision);
    server.views({
      engines: {
        html: require('handlebars')
      },
      path: path.join(__dirname, 'templates'),
      helpersPath: 'helpers'
    })
    server.route({
      path: '/',
      method: 'GET',
      handler: {
        view: "helper_tpl.html"
      }
    })
    await server.start();
    console.log(`Server is runing on ${process.argv[2]}`);
  } catch(err) {
    console.error(err);
  }
})()