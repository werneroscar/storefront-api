import { QueryResult } from 'pg';
import client from '../database';
import {
  CompletOrderDetails,
  Order,
  OrderDetails,
  SaveInfo
} from '../types/order';

export class OrderRepository {
  static getSaveInfo(details: OrderDetails): SaveInfo {
    const fields = details.status
      ? 'product_id, user_id, quantity, amount, status'
      : 'product_id, user_id, quantity, amount';

    if (!details.status) {
      delete details.status;
    }

    const values = details.status
      ? [details.productId, details.userId, details.quantity, details.amount]
      : [
          details.productId,
          details.userId,
          details.quantity,
          details.amount,
          details.status
        ];

    const sql =
      `INSERT INTO orders(${fields}) VALUES ${
        details.status ? '($1, $2, $3, $4, $5)' : '($1, $2, $3, $4)'
      } ` +
      'RETURNING id product_id AS "productId", quantity, cost, user_id AS "userId", ' +
      'status, created_at AS "createdAt", completed_at AS "completedAt"';

    return { values, sql };
  }
  static async save(details: OrderDetails): Promise<Order> {
    const conn = await client.connect();
    const saveInfo = OrderRepository.getSaveInfo(details);
    const result: QueryResult<Order> = await conn.query(
      saveInfo.sql,
      saveInfo.values
    );
    conn.release();
    return result.rows[0];
  }

  static async saveAll(details: OrderDetails[]): Promise<Order[]> {
    const savedOrders: Order[] = [];

    const conn = await client.connect();

    details.forEach(async (detail) => {
      const saveInfo = OrderRepository.getSaveInfo(detail);
      const result: QueryResult<Order> = await conn.query(
        saveInfo.sql,
        saveInfo.values
      );
      savedOrders.push(result.rows[0]);
    });

    conn.release();
    return savedOrders;
  }

  static async findByStatus(status: string, id: string): Promise<Order[]> {
    const conn = await client.connect();
    const ordersQuery =
      'SELECT id product_id AS "productId", quantity, cost, ' +
      'user_id AS "userId", status, created_at AS "createdAt", ' +
      'completed_at AS "completedAt" FROM orders WHERE status = ' +
      status +
      ' AND user_id = ($1)';
    const result: QueryResult<Order> = await conn.query(ordersQuery, [id]);
    conn.release();
    return result.rows;
  }

  static async findByCurrentUserOrders(id: string): Promise<Order[]> {
    return await OrderRepository.findByStatus('current', id);
  }

  static async findByCompletedUserOrders(id: string): Promise<Order[]> {
    return await OrderRepository.findByStatus('completed', id);
  }

  static async complete(details: CompletOrderDetails): Promise<Order> {
    const conn = await client.connect();
    const updateOrderQuery =
      "UPDATE orders SET status = 'comleted' WHERE id = $(1) " +
      'AND user_id = ($2) AND product_id = ($3) ' +
      'RETURNING id product_id AS "productId", quantity, cost, user_id AS "userId", ' +
      'status, created_at AS "createdAt", completed_at AS "completedAt"';

    const result: QueryResult<Order> = await conn.query(updateOrderQuery, [
      details.orderId,
      details.userId,
      details.productId
    ]);

    return result.rows[0];
  }

  static async completeAll(details: CompletOrderDetails[]): Promise<Order[]> {
    const completed: Order[] = [];

    details.forEach(async (detail) => {
      completed.push(await OrderRepository.complete(detail));
    });

    return completed;
  }
}
