"use client";

import { useState, FC } from "react";
import "./SignInSignUp.css";
import {
  AppButton,
  Typography,
} from "../shared/components/MaterialTailwind/MaterialTailwind";
import FormInput from "../shared/components/Inputs/FormInput";
import { useUser } from "@/contexts/UserContext";
import { getError } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignInSignUp: FC = () => {
  const router = useRouter();
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [name, setName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const { signInWithGoogle, createNewAccount, signInWithEmail } = useUser();

  const handleCreateAccount = async (e: any) => {
    e.preventDefault();
    setSignUpError("");
    setSignInError("");
    if (name.trim() === "") {
      setSignUpError("Name is required");
      return;
    }
    if (signUpEmail.trim() === "") {
      setSignUpError("Email is required");
      return;
    }
    if (signUpPassword !== confirmPassword) {
      setSignUpError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await createNewAccount(name, signUpEmail, signUpPassword);
      goToHome();
    } catch (error: any) {
      // console.log(error);
      setSignUpError(getError(error.code));
    }
    setLoading(false);
  };

  const handleEmailSignIn = async (e: any) => {
    e.preventDefault();
    setSignUpError("");
    setSignInError("");
    if (signInEmail.trim() === "") {
      setSignInError("Email is required");
      return;
    }
    if (signInEmail.trim() === "") {
      setSignInError("Password is required");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmail(signInEmail, signInPassword);
      goToHome();
    } catch (error: any) {
      // console.log(error);
      setSignInError(getError(error.code));
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async (e: any) => {
    e.preventDefault();
    setSignUpError("");
    setSignInError("");
    try {
      await signInWithGoogle();
      goToHome();
    } catch (error: any) {
      setSignInError(getError(error.code));
      setSignUpError(getError(error.code));
    }
    setLoading(false);
  };

  const goToHome = () => {
    router.replace("/");
  };

  return (
    <div
      className={`swap-container ${
        rightPanelActive ? "right-panel-active" : ""
      }`}
      id="swap-container"
    >
      <div className="form-container sign-up-container">
        <form action="#">
          <div className="mb-3 flex flex-col gap-3 w-full">
            <div className="text-start">
              {signUpError.length > 1 && <p className="error">{signUpError}</p>}
              <Typography variant="h4">Sign Up</Typography>
              <Typography color="gray" className="font-normal text-start">
                Enter your details to create an account.
              </Typography>
            </div>
            {/* <GoogleSignInButton onClick={handleGoogleSignIn} /> */}

            <FormInput
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <FormInput
              type="email"
              placeholder="Email"
              required
              autocomplete="email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              title="abc@example.com"
              onChange={(e) => {
                setSignUpEmail(e.target.value);
              }}
            />
            <FormInput
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setSignUpPassword(e.target.value);
              }}
            />
            <FormInput
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <AppButton
            className="mt-1"
            fullWidth
            loading={loading}
            onClick={handleCreateAccount}
          >
            Sign Up
          </AppButton>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <div className="mb-3 flex flex-col gap-3 w-full">
            <div className="text-start">
              {signInError.length > 1 && <p className="error">{signInError}</p>}
              <Typography variant="h4">Sign In</Typography>
              <Typography color="gray" className="font-normal text-start">
                Enter your details to log in to your account.
              </Typography>
            </div>
            {/* <GoogleSignInButton onClick={handleGoogleSignIn} /> */}
            <FormInput
              type="email"
              placeholder="Email"
              required
              autocomplete="email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              title="abc@example.com"
              onChange={(e) => {
                setSignInEmail(e.target.value);
              }}
            />
            <FormInput
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setSignInPassword(e.target.value);
              }}
            />
          </div>
          <AppButton
            className="mt-1"
            fullWidth
            loading={loading}
            onClick={handleEmailSignIn}
          >
            Sign In
          </AppButton>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <Typography className="font-normal text-start mb-2 text-white">
              Already have an account?
            </Typography>
            <AppButton
              className="ghost !bg-white !text-primary"
              id="signIn"
              onClick={() => setRightPanelActive(false)}
            >
              Sign In
            </AppButton>
          </div>
          <div className="overlay-panel overlay-right">
            <Typography className="font-normal text-start mb-2 text-white">
              Don&apos;t have an account?
            </Typography>
            <AppButton
              className="ghost !bg-white !text-primary"
              id="signUp"
              onClick={() => setRightPanelActive(true)}
            >
              Sign Up
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;

import React from "react";

function GoogleSignInButton({
  onClick,
}: {
  onClick: (e: any) => Promise<void>;
}) {
  return (
    <AppButton
      variant="outlined"
      color="blue-gray"
      className="flex items-center gap-3"
      onClick={onClick}
    >
      <Image
        src="/assets/images/icons/google-icon.svg"
        alt="goolgle sign in"
        className="h-6 w-6"
        width={24}
        height={24}
      />
      Continue with Google
    </AppButton>
  );
}
