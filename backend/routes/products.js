const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `./uploads/gallery/`;
    fs.mkdirSync(path, { recursive: true });
    return cb(null, path);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + 'pete' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
  },
});
const upload = multer({ storage: storage });

// POST /api/products - Add new product
router.post('/add', upload.array('file', 3), async (req, res) => {
  try {
    console.log('hi this is product adding');
    console.log(req);
    const productData = ({ name, description, price, category } = req.body);

    // pic upload
    const filePath = req.files.map((file) => file.path);
    console.log('this is filePath', filePath);

    productData.file = filePath;

    const product = new Product(productData);
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to add product', details: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    console.log('hello from backend !!');
  } catch (err) {
    console.error('Error from testing:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/list', async (req, res) => {
  try {
    console.log('product data fetching');
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching cases:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    console.log('single product fetching');
    console.log(req.params);

    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error('error');
    res.status(500).json({ message: 'Failed to fetch case' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  console.log(req);
  console.log(req.body);

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error updating product', error: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const itemId = req.params.id;

  console.log(itemId);

  try {
    const result = await db
      .collection('menus')
      .deleteOne({ _id: new ObjectId(itemId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;
