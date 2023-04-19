'use strict'
import express from 'express';
import routes from './routes.js';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.set('view engine', 'ejs');

const app_routes = routes(app); // passes ‘app’ instance to the routes module

  app.listen(app.get('port'), () => {
    console.log('Express started'); 
  });

console.log('Server running at http://127.0.0.1:3000/');