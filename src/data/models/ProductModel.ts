import type { Product } from '../../domain/entities/Product';

export interface ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  stock: number;
  category_id: string;
}

export const toProductEntity = (model: ProductModel): Product => ({
  id: model.id,
  name: model.name,
  description: model.description,
  price: model.price,
  imageUrl: model.image_url,
  stock: model.stock,
  categoryId: model.category_id,
});
