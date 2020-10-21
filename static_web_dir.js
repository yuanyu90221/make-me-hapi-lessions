'use strict';
const Inert = require('@hapi/inert');
const Hapi = require('@hapi/hapi');
(async()=> {
  try {
    const server = Hapi.Server({
      host: 'localhost',
      port: Number(process.argv[2]||8080)
    });
    await server.register(Inert);
    server.route({
      path: '/foo/bar/baz/{param}',
      method: 'GET',
      handler: {
        directory: { path: './public' }
      }
    })
    await server.start();
    console.log(`Server is runing on ${process.argv[2]}`);
  } catch(err) {
    console.error(err);
  }
})()