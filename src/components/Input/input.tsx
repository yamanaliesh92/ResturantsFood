import React, { FocusEventHandler } from "react";
import { ChangeHandler } from "react-hook-form";

interface IInputProps {
  label: string;
  value?: string | number;
  name?: string;
  type: string;
  htmlFor?: string;
  id?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  onChange?: ChangeHandler;
}

function MyInput(
  { label, name, onChange, placeholder, type, onBlur }: IInputProps,
  ref: any
) {
  return (
    <>
      <label className="text-black dark:text-dark text-[14px]" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        onChange={onChange}
        type={type || "number" || "password" || "file"}
        onBlur={onBlur}
        placeholder={placeholder}
        ref={ref}
        className="w-[75%] mt-1  h-[55px] outline-0 text-sm bg-white text-dark dark:bg-white dark:text-dark    border border-white dark:border-dark p-2 rounded-md placeholder:text-dark "
      />
    </>
  );
}

const Input = React.forwardRef(MyInput);

export default Input;
