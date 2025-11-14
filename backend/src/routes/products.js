const express = require('express');
const Product = require('../models/Product');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// GET /api/products - Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ active: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// GET /api/products/:id - Buscar produto específico
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

// POST /api/products - Criar produto (protegido)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      image: image || 'https://via.placeholder.com/150',
      stock: stock || 0,
    });

    await product.save();
    res.status(201).json({
      message: 'Produto criado com sucesso',
      product,
    });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar produto' });
  }
});

// ✅ PUT /api/products/:id - Atualizar produto (protegido)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, description, price, category, image, stock, active } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        image,
        stock,
        ...(active !== undefined ? { active } : {}),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({
      message: 'Produto atualizado com sucesso',
      product: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

module.exports = router;
