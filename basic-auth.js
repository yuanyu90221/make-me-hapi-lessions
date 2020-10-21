'use strict';
const Hapi = require('@hapi/hapi');
const basic = require('@hapi/basic');
const user = { name: 'hapi', password: 'auth'};
const validate = async (req, username, password, h) => {
  const isValid = (username === user.name && password === user.password);
  return { isValid, credentials: {name: user.name}};
}
(async()=> {
  try {
    
    const server = Hapi.Server({
      host: 'localhost',
      port: Number(process.argv[2]||8080)
    });
    await server.register(basic);
    server.auth.strategy('simple', 'basic', {validate});
    server.auth.default('simple');
    server.route({
      path: '/',
      method: 'GET',
      handler: (req, h) => {
        return `welcome`;
      }
    })
    await server.start();
    console.log(`Server is runing on ${process.argv[2]}`);
  } catch (err) {
    console.error(err);
  }
})()