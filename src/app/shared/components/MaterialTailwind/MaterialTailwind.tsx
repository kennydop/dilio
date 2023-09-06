"use client";
import React, { FC, Ref } from "react";
import {
  ThemeProvider,
  Button,
  IconButton,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Carousel,
  Spinner,
  Avatar
} from "@material-tailwind/react";
import type { ButtonProps } from "@material-tailwind/react";

interface AppButtonProps extends ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

const AppButton: FC<AppButtonProps> = ({
  children,
  loading,
  onClick,
  className,
  color,
  ref,
  ...props
}) => {
  return (
    <Button
      ref={ref}
      {...props}
      color={color}
      onClick={loading ? undefined : onClick}
      className={`${color == undefined && "bg-primary text-white"} rounded-md ${
        className || ""
      }`}
    >
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <Loading className="h-5 w-5" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

const AppIconButton: React.FC<AppButtonProps> = ({
  children,
  className,
  ref,
  ...props
}) => {
  return (
    <IconButton
      ref={ref}
      {...props}
      className={`bg-primary text-white rounded-md ${className || ""}`}
    >
      {children}
    </IconButton>
  );
};

const Loading: React.FC<any> = ({ className }) => {
  return <Spinner color="blue" className={className} />;
};

export {
  ThemeProvider,
  Button,
  AppButton,
  AppIconButton,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Carousel,
  Loading,
  Avatar
};