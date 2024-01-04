import { ChangeEvent, FC } from "react";

interface IInputProps {
  label: string;
  value: string | number;
  name: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
}

const Input: FC<IInputProps> = ({ label, value, onChange, name, type }) => {
  return (
    <>
      <input
        data-testid={`${name}-test-id`}
        value={value || ""}
        placeholder={label}
        onChange={onChange}
        type={type || "number" || "password"}
        className="w-[75%] mt-1 h-[35px] outline-0 text-sm border border-gray-300 p-2 rounded-md placeholder-gray-400 "
      />
    </>
  );
};

export default Input;
