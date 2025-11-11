declare global {
  type Product = {
    _id: string;
    prodnumber: string;
    shopuserid: string;
    image: string;
    price: number;
    quantity: number;
  };

  type User = {
    _id: string;
    createdAt: string;
    __v: number;
    email: string;
    firstName?: string;
    lastName?: string;
    roles: string[];
  };

  type LoginInput = { email: string; password: string };

  type AuthContextType = {
    signedIn: boolean;
    user: User | null;
    handleSignIn: ({ email, password }: LoginInput) => Promise<void>;
    handleSignOut: () => void;
  };
}
