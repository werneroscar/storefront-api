export interface ProductDetails {
  name: string;
  price: number;
  categoryId: number;
}

export interface Product extends ProductDetails {
  id: string;
  category: string;
}
