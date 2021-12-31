import * as React from "react";
export interface IBaseInputProps {
  value: string | number | string[] | undefined;
  field: string;
  type?: "text" | "number" | "password" | "email";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = ({
  value,
  field,
  onChange,
  className = "form-control",
  type = "text",
}: IBaseInputProps) => {
  const [autocomplete, setAutocomplete] = React.useState<string>("off");

  React.useEffect(() => {
    if (type === "password") {
      setAutocomplete("on");
    }
  });

  return (
    <input
      onChange={onChange}
      value={value}
      name={field}
      id={field}
      type={type}
      className={className}
      autoComplete={autocomplete}
    />
  );
};

export default Input;
