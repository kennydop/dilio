import { HTMLInputTypeAttribute, ChangeEvent } from "react";
import { Select, Option } from "@material-tailwind/react";

interface Props {
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  required?: boolean;
  autocomplete?: string;
  pattern?: string;
  title?: string;
  value?: string;
  options?: string[];
  height?: string;
  onChange?: (e: any) => void;
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
  options = [],
  height,
  onChange,
}: Props) {
  return type === "select" ? (
    <div className="w-full">
      <Select
        label={placeholder}
        title={title}
        value={value}
        onChange={onChange}
        className="!border-none !p-2 !rounded-lg bg-transparent ring-1 ring-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </div>
  ) : type === "textarea" ? (
    <textarea
      placeholder={placeholder}
      required={required}
      autoComplete={autocomplete}
      title={title}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded-lg bg-transparent ring-1 ring-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
      style={{ resize: "none", minHeight: height }}
    />
  ) : (
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
