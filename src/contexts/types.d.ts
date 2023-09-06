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
  updateCart: (cart: string[]) => Promise<void>;
  logOut: () => Promise<void>;
}

interface IUserDoc {
  displayName: string;
  email: string;
  photoURL: string;
  cart?: string[];
  orders?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
