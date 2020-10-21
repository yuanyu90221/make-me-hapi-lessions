'use strict';
const Hapi = require('@hapi/hapi');
const rot13 = require('rot13-transform');
const fs = require('fs');
const path = require('path');
(async()=> {
  try {
    const server = Hapi.Server({
      host: 'localhost',
      port: Number(process.argv[2]||8080)
    });
    server.route({
      path: '/',
      method: 'GET',
      handler: (req, h) => {
        const readStream = fs.createReadStream(path.join(__dirname, 'inputfile.txt'))
        return readStream.pipe(rot13())
      }
    })
    await server.start();
    console.log(`Server is runing on ${process.argv[2]}`);
  } catch (err) {
    console.error(err);
  }
})()