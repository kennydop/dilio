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
} from "@material-tailwind/react";
import type { ButtonProps } from "@material-tailwind/react";

interface AppButtonProps extends ButtonProps {
  children: React.ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

const AppButton: FC<AppButtonProps> = ({
  children,
  className,
  ref,
  ...props
}) => {
  return (
    <Button
      ref={ref}
      {...props}
      className={`bg-primary text-white rounded-md ${className || ""}`}
    >
      <div>{children}</div>
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
};
