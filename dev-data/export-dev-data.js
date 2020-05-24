const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('../models/Product');
 
 
mongoose
  .connect("mongodb+srv://keval:Keval1234@cluster0-54swq.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));
 
 
// READ FILE - products.json
var jsonPath = path.join(__dirname, '..', 'static', 'products.json');
var jsonString = fs.readFileSync(jsonPath, 'utf8');
const products = JSON.parse(jsonString);
 
// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Product.create(products);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
 
//this makes it possible to run this command "node export-dev-data.js --import"
if (process.argv[2] === '--import') {
  importData();
}