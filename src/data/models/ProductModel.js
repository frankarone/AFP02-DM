// Modelo de datos del backend y su conversión a la entidad Product.

/**
 * @typedef {Object} ProductModel
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} [image_url]
 * @property {number} stock
 * @property {string} category_id
 */

export const toProductEntity = (model) => ({
  id: model.id,
  name: model.name,
  description: model.description,
  price: model.price,
  imageUrl: model.image_url,
  stock: model.stock,
  categoryId: model.category_id,
});
