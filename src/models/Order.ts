import { OrderRepository } from '../repositories/OrderRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { CompletOrderDetails, Order, OrderDetails } from '../types/order';
import { orderSchema } from '../utils/validations';

export class OrderStore {
  static async calculateCost(details: OrderDetails): Promise<string> {
    const product = await ProductRepository.findById(details.productId);
    const cost = +product.price * +details.quantity;
    return cost.toFixed(2);
  }

  static async create(
    details: OrderDetails | OrderDetails[]
  ): Promise<Order | Order[]> {
    // await orderSchema.validateAsync(details, { abortEarly: false });
    // console.log('truth', Array.isArray(details))
    if (Array.isArray(details)) {
      for (let detail of details) {
        detail.cost = await OrderStore.calculateCost(detail);
      }

      return await OrderRepository.saveAll(details);
    }

    details.cost = await OrderStore.calculateCost(details);
    return await OrderRepository.save(details);
  }

  static async currentOrdersByUser(id: string): Promise<Order[]> {
    //TODO: validate id
    return await OrderRepository.findByCurrentUserOrders(id);
  }

  static async completedOrdersByUser(id: string): Promise<Order[]> {
    //TODO: validate id
    const completedOrders = await OrderRepository.findByCompletedUserOrders(id);
    return completedOrders;
  }

  static async completeUserOrder(
    details: CompletOrderDetails | CompletOrderDetails[]
  ): Promise<Order | Order[]> {
    //todo: validate details
    // console.log('comp ord dets',details)
    // console.log('truth', Array.isArray(details))

    if (Array.isArray(details)) {
      return await OrderRepository.completeAll(details);
    }

    return await OrderRepository.complete(details);
  }
}
