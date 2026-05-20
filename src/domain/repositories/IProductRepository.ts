import type { Product } from '../entities/Product';

export interface ProductFilters {
  categoryId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface IProductRepository {
  getAll(filters?: ProductFilters): Promise<Product[]>;
  getById(id: string): Promise<Product>;
}
