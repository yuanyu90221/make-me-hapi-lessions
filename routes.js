'use strict';
const Hapi = require('@hapi/hapi');
(async()=> {
  try {
    const server = Hapi.Server({
      host: 'localhost',
      port: Number(process.argv[2]||8080)
    });
    server.route({
      path: '/{name}',
      method: 'GET',
      handler: (req, h) => {
        return `Hello ${req.params.name}`
      }
    })
    await server.start();
    console.log(`Server is runing on ${process.argv[2]}`);
  } catch (err) {
    console.error(err);
  }
})()