import { Timestamp } from "firebase/firestore";

interface IUserContext {
  user: User | null;
  userDoc: IUserDoc | null;
  createNewAccount: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  updateCart: (cart: ICartItem[]) => Promise<void>;
  placeOrder: (order: IOrder) => Promise<void>;
  logOut: () => Promise<void>;
}

interface IUserDoc {
  displayName: string;
  email: string;
  photoURL: string;
  cart?: ICartItem[];
  orders?: string[];
  admin?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

interface ICartItem {
  id: string;
  quantity: number;
}

interface IOrder {
  code: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  reference: string;
  items: ICartItem[];
  total: number;
  paid: boolean;
  status: IOrderStatus;
  processingDate?: Timestamp;
  inTransitDate?: Timestamp;
  deliveredDate?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "in-transit"
  | "delivered"
  | "canceled";
