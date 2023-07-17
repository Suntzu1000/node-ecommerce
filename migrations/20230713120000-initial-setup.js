const { User, Product, Blog, Category, BlogCategory, Brand, Color } = require('../models');

async function up() {
  // Crie as tabelas
  await User.createCollection();
  await Product.createCollection();
  await Blog.createCollection();
  await Category.createCollection();
  await BlogCategory.createCollection();
  await Brand.createCollection();
  await Color.createCollection();

  // Adicione índices, se necessário
  await User.createIndexes();
  await Product.createIndexes();
  await Blog.createIndexes();
  await Category.createIndexes();
  await BlogCategory.createIndexes();
  await Brand.createIndexes();
  await Color.createIndexes();

  // Adicione dados iniciais, se necessário
  await User.insertMany([
    { firstName: '', lastName: '' },
    { firstName: '', lastName: '' },
  ]);
}

module.exports = { up };
