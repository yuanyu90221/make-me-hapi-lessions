  Basic Authentication is a simple way to protect access to your application  
  using only a username and password. There is no need for cookies or  
  sessions, only a standard HTTP header.  
   
  Create a hapi server that listens on a port passed from the command line  
  and is protected with Basic Authentication. The authentication username  
  should be "hapi" and the password "auth" and the server should respond  
  with an HTTP 401 status code when authentication fails.  
   
 ─────────────────────────────────────────────────────────────────────────────  
  ##HINTS  
   
  There is a hapi plugin for handling basic authentication. Install it by  
  running:  
   
     npm install @hapi/basic  
   
  You'll need to register the @hapi/basic plugin then configure a named  
  authentication strategy for basic. Once authentication is configured,  
  you'll need to set the auth property in the route configuration to the  
  name of the strategy you configured.  
   
     server.auth.strategy('simple', 'basic', { validateFunc: validate });  
     server.auth.default('simple');  
       
     server.route({  
         method: 'GET',  
         path: '/',  
         handler: function (request, h) {  
       
             return 'welcome';  
         }  
     });  
   
  Hapi-auth-basic information can be found here:  
   
     file:///home/json/.nvm/versions/node/v12.16.0/lib/node_modules/makemehapi/node_modules/@hapi/basic/README.md  
   
