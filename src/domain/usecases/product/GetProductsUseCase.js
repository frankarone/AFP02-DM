export class GetProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(filters) {
    return this.productRepository.getAll(filters);
  }
}
