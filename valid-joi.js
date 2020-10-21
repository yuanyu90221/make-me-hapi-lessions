'use strict';
const Hapi = require('@hapi/hapi');
const Joi = require('joi');
(async()=> {
  try {
    const server = Hapi.Server({
      host: 'localhost',
      port: Number(process.argv[2]||8080)
    });
    server.route({
      path: '/chickens/{breed}',
      method: 'GET',
      handler: (req, h) => {
        return `You asked for the chicken ${req.params.breed}`
      },
      config: {
        validate: {
          params: Joi.object({
            breed: Joi.string().required()
          })
        }
      }
    })
    await server.start();
    console.log(`Server is runing on ${process.argv[2]}`);
  } catch (err) {
    console.error(err);
  }
})()