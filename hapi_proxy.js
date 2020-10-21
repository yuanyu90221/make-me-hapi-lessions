'use strict';
const H2o2 = require('h2o2');
const Hapi = require('@hapi/hapi');
(async()=> {
  try {
    const server = Hapi.Server({
      host: 'localhost',
      port: Number(process.argv[2]||8080)
    });
    await server.register(H2o2);
    server.route({
      path: '/proxy',
      method: 'GET',
      handler: {
        proxy: {
          host: '127.0.0.1',
          port: 65535
        }
      }
    })
    await server.start();
    console.log(`Server is runing on ${process.argv[2]}`);
  } catch(err) {
    console.error(err);
  }
})()