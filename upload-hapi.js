'use strict';
const Hapi = require('@hapi/hapi');
(async()=> {
  try {
    const server = Hapi.Server({
      host: 'localhost',
      port: Number(process.argv[2]||8080)
    });
    server.route({
      path: '/upload',
      method: 'POST',
      options: {
        payload: {
          output: 'stream',
          parse: true,
          multipart: true
        }
      },
      handler: (req, reply) => new Promise((resolve, reject) => {
        let body = '';
        req.payload.file.on('data', function (data){
          body += data;
        });
        req.payload.file.on('end', function(){
          const result = {
            description: req.payload.description,
            file: {
              data: body,
              filename: req.payload.file.hapi.filename,
              headers: req.payload.file.hapi.headers
            }
          };
          return resolve(JSON.stringify(result));
        }); 
      })
    })
    await server.start();
    console.log(`Server is runing on ${process.argv[2]}`);
  } catch (err) {
    console.error(err);
  }
})()