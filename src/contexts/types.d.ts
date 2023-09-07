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
  logOut: () => Promise<void>;
}

interface IUserDoc {
  displayName: string;
  email: string;
  photoURL: string;
  cart?: ICartItem[];
  orders?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface ICartItem {
  id: string;
  quantity: number;
}
