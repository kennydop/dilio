interface ICategory {
  id: string;
  name: string;
  description?: string;
  icon: string;
}

interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  shipping: number;
  category: string;
  images: string[];
  quantity: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
