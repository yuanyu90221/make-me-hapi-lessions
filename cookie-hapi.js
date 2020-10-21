'use strict';
const Hapi = require('@hapi/hapi');
const boom = require('boom');
(async()=> {
  try {
    const server = Hapi.Server({
      host: 'localhost',
      port: Number(process.argv[2]||8080)
    });
    server.state('session', { 
      path: '/', 
      ttl: 10,
      encoding: 'base64json',
      domain: 'localhost',
      isSecure: false,
      isSameSite: false,
      isHttpOnly: false
    });
    server.route([{
      path: '/check-cookie',
      method: 'GET',
      options: {
        state: {
          parse: true,
          failAction: 'log'
        }
      },
      handler: (req, reply) => {
        const session = req.state.session;
        if (session !== null) {
          return {user: 'hapi'};
        } else {
          return reply(boom.unauthorized('Missing authentication'));
        }
      }
    },{
      path: '/set-cookie',
      method: 'GET',
      options: {
        state: {
          parse: true,
          failAction: 'log'
        }
      },
      handler: (req, reply) => {
        return reply.response({message: 'success'}).state('session', {key: 'makemehapi'})
      }
    }])
    await server.start();
    console.log(`Server is runing on ${process.argv[2]}`);
  } catch (err) {
    console.error(err);
  }
})()