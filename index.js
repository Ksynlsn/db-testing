'use strict'
import express from 'express';
import routes from './routes.js';
import cors from 'cors';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.set('view engine', 'ejs');
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route
app.use(express.json()); //Used to parse JSON bodies

const app_routes = routes(app); // passes ‘app’ instance to the routes module

  app.listen(app.get('port'), () => {
    console.log('Express started'); 
  });

console.log('Server running at http://127.0.0.1:3000/');