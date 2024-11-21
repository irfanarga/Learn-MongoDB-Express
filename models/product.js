const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  brand: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  color: {
    type: String,
    require: true
  },
  category: {
    type: String,
    enum: ['Baju', 'Celana', 'Jaket', 'Aksesoris'],
  } 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;