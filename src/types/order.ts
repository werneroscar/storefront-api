interface UserAndProductId {
  productId: string;
  userId: string;
}

export interface OrderDetails extends UserAndProductId {
  quantity: number;
  status?: string;
  cost?: string;
}

export interface Order extends OrderDetails {
  id: string;
  createdAt: Date;
  completedAt: Date | null;
}

export interface CompletOrderDetails extends UserAndProductId {
  orderId: string;
}

export interface SaveInfo {
  values: (string | number | undefined)[];
  sql: string;
}
