"use client";
import {
  Card,
  AppButton,
  Typography,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import FormInput from "@/app/shared/components/Inputs/FormInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { useUser } from "@/contexts/UserContext";
import { getError } from "@/utils/utils";

export default function AdminSignIn() {
  const [error, setError] = useState<string | null>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithEmail } = useUser();

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check if user with the provided email is admin
    const querySnapshot = await getDocs(
      query(
        collection(db, "users"),
        where("email", "==", email.trim()),
        where("admin", "==", true)
      )
    );

    if (!querySnapshot.empty) {
      // User is an admin
      alert("User found");
      try {
        // Sign in user
        signInWithEmail(email.trim(), password);
        router.push("/admin/dashboard");
      } catch (error: any) {
        setError(getError(error?.code));
      } finally {
        setLoading(false);
      }
    } else {
      // User is not an admin or doesn't exist
      setError("You are not authorized as an admin.");
      setLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to log in.
      </Typography>
      {error && <p className="error">{error}</p>}
      <form className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-3">
          <FormInput
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <AppButton
          className="mt-4"
          fullWidth
          loading={loading}
          onClick={handleSignIn}
        >
          Sign In
        </AppButton>
      </form>
    </Card>
  );
}
