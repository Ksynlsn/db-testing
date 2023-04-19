// return all records that match a condition
import { Item } from "./models/Item.js";

// return all records
Item.find({}).lean()
  .then((items) => {
    console.log(items);
  })
  .catch(err => next(err));