export interface ProductDetails {
  name: string;
  price: string;
  category: string;
}

export interface Product extends ProductDetails {
  id: string;
  categoryId: number;
}
