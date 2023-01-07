export interface ProductDetails {
  name: string;
  price: number;
  category: string;
}

export interface Product extends ProductDetails {
  id: string;
  categoryId: number;
}
