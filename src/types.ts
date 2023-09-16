export type User = {
  id: string;
  username: string;
  password: string;
  deposit: number;
  role: string;
};

export type Product = {
  id: number;
  amountAvailable: number;
  cost: number;
  productName: string;
  sellerId: string;
};

export type Purchase = {
  id: string;
  userId: string;
  productId: number;
  productName: string;
  amount: number;
  totalCost: number;
  createdAt: string;
};
