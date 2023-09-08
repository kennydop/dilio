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
  Avatar,
  Badge,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
} from "@material-tailwind/react";
import type { ButtonProps } from "@material-tailwind/react";
import { Raleway } from "next/font/google";
const font = Raleway({ subsets: ["latin"] });

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
  variant,
  ref,
  ...props
}) => {
  return (
    <Button
      ref={ref}
      variant={variant || "filled"}
      {...props}
      color={color}
      onClick={loading ? undefined : onClick}
      className={`${
        color == undefined && variant == undefined
          ? "bg-primary text-white"
          : ""
      } rounded-md ${className || ""}`}
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
  loading,
  variant,
  onClick,
  color,
  ref,
  ...props
}) => {
  return (
    <IconButton
      ref={ref}
      variant={variant || "filled"}
      {...props}
      color={color}
      onClick={loading ? undefined : onClick}
      className={`${
        color == undefined && variant == undefined
          ? "bg-primary text-white"
          : ""
      } rounded-md ${className || ""}`}
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
  Avatar,
  Badge,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
};
