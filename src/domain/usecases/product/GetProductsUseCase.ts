import type { IProductRepository, ProductFilters } from '../../repositories/IProductRepository';
import type { Product } from '../../entities/Product';

export class GetProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(filters?: ProductFilters): Promise<Product[]> {
    return this.productRepository.getAll(filters);
  }
}
