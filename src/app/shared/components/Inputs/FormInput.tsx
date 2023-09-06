import React from "react";

interface Props {
  placeholder: string;
  type?: string;
  className?: string;
  required?: boolean;
  autocomplete?: string;
  pattern?: string;
  title?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormInput({
  placeholder,
  type = "text",
  className = "",
  required,
  autocomplete,
  pattern,
  title,
  value,
  onChange,
}: Props) {
  return (
    <input
      placeholder={placeholder}
      required={required}
      autoComplete={autocomplete}
      pattern={pattern}
      title={title}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded-lg bg-transparent ring-1 ring-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
    />
  );
}

export default FormInput;
