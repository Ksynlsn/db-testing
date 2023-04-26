//import * as data from './data.js';
import { Item } from "./models/Item.js";

export default (app)  => {
    app.get('/', (req,res, next) => {
  
        Item.find({}).lean()
        .then((items) => {
            res.render('home', { items } );
        })
        .catch(err => next(err));
        });

   app.get('/details/:name', (req, res, next) => {
    let imagePath = `/images/${req.params.name}.jpeg`;
    Item.findOne({ "name": req.params.name }).lean()
        .then((items) => {
            
            res.render('details', {item: items, path: imagePath});
        })
        .catch(err => next(err));
   });

   // API Routes
   // get all items
   app.get('/api/items', (req, res, next) => { 
    Item.find({})
      .then(items => {
        if (!items) {
          res.status(500).json({message : "Database error"});
        } else {
          res.status(200).json({items, message : "Retrieval Successful"});
        }
      })
      .catch(err => {
        res.send('404 Error');
      });
  });

  // get single item
  app.get('/api/items/:name', (req, res, next) => { 
    let name = req.params.name;
    Item.findOne({name: name})
      .then(item => {
        if (!item) {
          res.status(500).json({message : `We don't have records for ${name}`});
        } else {
          res.status(200).json({message : `Returned records for ${name}`, item});
        }
      })
      .catch(err => {
        res.send('404 Error');
      });
  });

  // creates new record or updates existing record if name exists in db
  app.post('/api/add/', (req, res, next) => {
    console.log(req.body);
    Item.findOne({name: req.body.name})
        .then(found => {
          if(found) {
          Item.updateOne(
          {name: req.body.name},
          { $set: {color: req.body.color,
                  inStock: req.body.inStock,
                  locations: req.body.locations,
                  price: req.body.price}
          })
          .then(() => {
            res.json({ message: `1 record updated for ${req.body.name}` });
          })
          .catch((err) => {
            res.status(500).json({ message: "Database error" });
          });
        } else {
          let item = new Item({
          name: req.body.name,
          color: req.body.color,
          inStock: req.body.inStock,
          locations: req.body.locations,
          price: req.body.price
        });
        item.save()
        .then(newItem => {
          console.log(newItem);
          res.json({ message: `1 record created for ${newItem.name}` });
        })
        .catch(err => {
          res.status(500).json({ message: 'Database error' });
        });
    }
  });
  });

  // Delete item by name
  app.get('/api/delete/', (req, res) => {
    Item.findOne({name: req.body.name})
        .then(found => {
        if (!found) {
        res.json({ message: 'This item is not in our databse' });
            } else {
            Item.deleteOne({name: req.body.name})
            .then(() => {
        res.json({ deletedCount: 1, message: `Item ${req.body.name} has been deleted`});
    }) 
   .catch((err) => {
        res.send('404 Error');
   });
    }
}) 
}); 
  // Delete multiple items by name
  app.get('/api/delete-many/', (req, res) => {
    Item.deleteMany({ names: { $in: req.body.names } })
      .then((result) => {
        res.json({ deletedCount: result.deletedCount, message: `Items ${JSON.stringify({ names: req.body.names })} have been deleted` });
      })
      .catch((err) => {
        console.error('Error deleting items:', err);
        res.status(404).send('Error deleting items');
      });
  });


app.get('/delete/:name', (req, res) => {
    let name = req.params.name;
    Item.findOne({name: name})
        .then(found => {
        if (!found) {
        res.send('This item is not in our databse');
            } else {
            Item.deleteOne({name: name})
            .then(() => {
        res.send(`Item ${req.params.name} has been deleted`);
    }) 
   .catch((err) => {
        res.send('404 Error');
   });
    }
}) 
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


}; // end export default app
