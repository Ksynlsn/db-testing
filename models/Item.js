import mongoose from 'mongoose';
import { connectionString } from "../credentials.js";
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git


mongoose.connect(connectionString, {
    dbName: 'test-db',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const itemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: false },
    locations: { type: Array, required: false },
    inStock: { type: Boolean, required: true },
  },
    {
    versionKey: false
    }
);

export const Item = mongoose.model('Item', itemSchema);