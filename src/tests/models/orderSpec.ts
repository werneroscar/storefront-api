import { OrderStore } from '../../models/Order';
import { ProductStore } from '../../models/Product';
import { UserStore } from '../../models/User';
import { Product } from '../../types/product';
import { User } from '../../types/user';

describe('OrderStore should have ', () => {
  it('create method', () => {
    expect(OrderStore.create).toBeDefined();
  });
  it('currentOrdersByUser method', () => {
    expect(OrderStore.currentOrdersByUser).toBeDefined();
  });
  it('completedOrdersByUser method', () => {
    expect(OrderStore.completedOrdersByUser).toBeDefined();
  });
  it('completeUserOrder method', () => {
    expect(OrderStore.completeUserOrder).toBeDefined();
  });
});

describe('OrderStore should', () => {
  let testOrder: Order;
  let testOrderTwo: Order;
  let testOrderThree: Order;
  let user: User;

  let userTwo: User;

  let product: Product;

  let productTwo: Product;

  it('create order', async () => {
    user = await UserStore.create({
      firstName: 'John',
      lastName: 'Doe',
      password: 'JohnDo$123'
    });

    userTwo = await UserStore.create({
      firstName: 'Logan',
      lastName: 'Lopez',
      password: '1og@nlo'
    });

    product = await ProductStore.create({
      name: 'Test Product',
      price: '10',
      category: 'Test'
    });

    productTwo = await ProductStore.create({
      name: 'Test Product Two',
      price: '25',
      category: 'Boys'
    });

    const order = OrderStore.create({
      productId: product.id,
      quantity: 3,
      userId: user.id
    });

    testOrder = order;

    expect(order).toEqual({
      id: order.id,
      productId: order.productId,
      quantity: 3,
      cost: '30.00',
      userId: order.userId,
      createdAt: order.createdAt,
      completedAt: null
    });
  });

  it('should create multiple orders', async () => {
    const orderTwo = {
      productId: product.id,
      quantity: 3.5,
      userId: user.id
    };
    const orders = OrderStore.create([testOrder, orderTwo]);

    expect(orders).toEqual([testOrder, orderTwo]);
  });

  it('should complete order', async () => {
    const orderToComplete = OrderStore.completeUserOrder({
      orderId: testOrder.id,
      productId: product.id,
      userId: user.id
    });
    expect(OrderStore.completeUserOrder(orderToComplete)).toEqual(
      orderToComplete
    );
  });

  it('should complete multiple orders', async () => {
    const orderTwo = OrderStore.create({
      productId: productTwo.id,
      quantity: 5,
      userId: user.id
    });
    testOrderTwo = orderTwo;

    const orderThree = OrderStore.create({
      productId: productTwo.id,
      quantity: 5,
      userId: userTwo.id
    });
    testOrderThree = orderThree;

    expect(OrderStore.create([orderTwo, orderThree])).toEqual([
      orderTwo,
      orderThree
    ]);
  });

  it('should show active orders by user', async () => {
    expect(OrderStore.currentOrdersByUser(userTwo.id)).toEqual([
      testOrderThree
    ]);
  });

  it('should show completed orders by user', async () => {
    expect(OrderStore.completeOrdersByUser(user.id)).toEqual([
      testOrder,
      testOrderTwo,
      testOrderThree
    ]);
  });
});
