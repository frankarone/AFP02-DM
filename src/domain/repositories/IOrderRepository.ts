import type { Order, OrderItem } from '../entities/Order';

export interface IOrderRepository {
  create(items: OrderItem[]): Promise<Order>;
  getAll(): Promise<Order[]>;
  getById(id: string): Promise<Order>;
}
