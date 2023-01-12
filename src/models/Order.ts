import { OrderRepository } from '../repositories/OrderRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { CompletOrderDetails, Order, OrderDetails } from '../types/order';
import {
  completOrderSchema,
  orderSchema,
  uuidSchema
} from '../utils/validations';

export class OrderStore {
  static async calculateCost(details: OrderDetails): Promise<string> {
    const product = await ProductRepository.findById(details.productId);
    const cost = +product.price * +details.quantity;
    return cost.toFixed(2);
  }

  static async create(
    details: OrderDetails | OrderDetails[]
  ): Promise<Order | Order[]> {
    if (Array.isArray(details)) {
      await orderSchema.validateAsync(details);
      for (const detail of details) {
        detail.cost = await OrderStore.calculateCost(detail);
      }

      return await OrderRepository.saveAll(details);
    }

    await orderSchema.validateAsync([details]);
    details.cost = await OrderStore.calculateCost(details);
    return await OrderRepository.save(details);
  }

  static async currentOrdersByUser(id: string): Promise<Order[]> {
    await uuidSchema.validateAsync({ id });
    return await OrderRepository.findByCurrentUserOrders(id);
  }

  static async completedOrdersByUser(id: string): Promise<Order[]> {
    await uuidSchema.validateAsync({ id });
    return await OrderRepository.findByCompletedUserOrders(id);
  }

  static async completeUserOrder(
    details: CompletOrderDetails | CompletOrderDetails[]
  ): Promise<Order | Order[]> {
    if (Array.isArray(details)) {
      await completOrderSchema.validateAsync(details);
      return await OrderRepository.completeAll(details);
    }

    await completOrderSchema.validateAsync([details]);
    return await OrderRepository.complete(details);
  }
}
