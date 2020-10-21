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
      path: '/login',
      method: 'POST',
      handler: (req, h) => {
        return `login successful`
      },
      config: {
        validate: {
          payload: Joi.object({
            isGuest: Joi.boolean().required(),
            username: Joi.string().when('isGuest', {is: false, then: Joi.required()}),
            accessToken: Joi.string().alphanum(),
            password: Joi.string().alphanum()
          })
          .options({allowUnknown: true})
          .without('password', 'accessToken')
        }
      }
    })
    await server.start();
    console.log(`Server is runing on ${process.argv[2]}`);
  } catch (err) {
    console.error(err);
  }
})()