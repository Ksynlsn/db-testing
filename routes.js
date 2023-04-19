//import * as data from './data.js';
import { Item } from "./models/Item.js";

export default (app)  => {
    app.get('/', (req,res, next) => {
        // let result = data.getAll();
        // res.render('home', {items: result});
        // console.log(result);
        Item.find({}).lean()
        .then((items) => {
            res.render('home', { items } );
        })
        .catch(err => next(err));
        });

   app.get('/details/:name', (req, res, next) => {
    //console.log(req.params.name);
    let imagePath = `/images/${req.params.name}.jpeg`;
    Item.findOne({ "name": req.params.name }).lean()
        .then((items) => {
            
            res.render('details', {item: items, path: imagePath});
        })
        .catch(err => next(err));
    //let imagePath = `/images/${name}.jpeg`;
    //res.render('details', {item: data.getItem(req.params.name), imagePath: imagePath});
   });
  
  // send plain text response
  app.get('/about', (req,res) => {
   res.type('text/plain');
   res.send('About page');
  });
  
  // define 404 handler
  app.use((req,res) => {
   res.type('text/plain'); 
   res.status(404);
   res.send('404 - Not found');
  });

  

};
