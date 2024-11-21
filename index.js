const path = require('path');
const express = require('express');
const menthodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();

/* Models */
const Product = require('./models/product');

// connect to mongodb
mongoose.connect('mongodb://localhost/shop_db').
  then((result) => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log(err);
  })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(menthodOverride('_method'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.render('products/index', { products });
})

app.get('/products/create', (req, res) => {
  res.render('products/create');
})

app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect(`/products/${product._id}`);
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/show', { product });
})

app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product });
})

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
  res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/products');
})

app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});