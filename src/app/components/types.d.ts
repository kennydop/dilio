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
  category: string;
  images: string[];
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}
