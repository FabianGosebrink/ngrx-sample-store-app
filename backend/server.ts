import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dataPath = (filename: string) => path.join(__dirname, 'data', filename);

enum ProductCategory {
  BOOK_FANTASY = 'book_fantasy',
  BOOK_HISTORY = 'book_history',
  BOOK_ROMANCE = 'book_romance',
}

type Product = {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
};

// Utility to read JSON files
const readJSON = async <T>(filename: string): Promise<T> => {
  const content = await fs.readFile(dataPath(filename), 'utf-8');
  return JSON.parse(content);
};

// Utility to write JSON files
const writeJSON = async <T>(filename: string, data: T): Promise<void> => {
  await fs.writeFile(dataPath(filename), JSON.stringify(data, null, 2));
};

// Wrapper to handle async errors correctly
const asyncHandler =
  (fn: express.RequestHandler): express.RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Get all products
app.get(
  '/products',
  asyncHandler(async (req, res) => {
    const products = await readJSON<Product[]>('products.json');
    res.json(products);
  }),
);

app.get(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const products = await readJSON<Product[]>('products.json');
    const product = products.find((p) => p.id === id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json(product);
  }),
);

// Get current cart
app.get(
  '/cart',
  asyncHandler(async (req, res) => {
    const cart = await readJSON<Product[]>('cart.json');
    res.json(cart);
  }),
);

// Add product to cart
app.post(
  '/cart',
  asyncHandler(async (req, res) => {
    const { id } = req.body;
    const products = await readJSON<Product[]>('products.json');
    const cart = await readJSON<Product[]>('cart.json');

    const product = products.find((p) => p.id === id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    cart.push(product);
    await writeJSON('cart.json', cart);
    res.status(201).json(cart);
  }),
);

// Remove product from cart
app.delete(
  '/cart/:itemIndex',
  asyncHandler(async (req, res) => {
    const { itemIndex } = req.params;
    const index = parseInt(itemIndex, 10);
    const cart = await readJSON<Product[]>('cart.json');

    if (isNaN(index) || index < 0 || index >= cart.length) {
      res.status(400).json({ error: 'Invalid index' });
      return;
    }

    cart.splice(index, 1);
    await writeJSON('cart.json', cart);
    res.status(200).json(cart);
  }),
);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
