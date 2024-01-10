// import React from "react";
// import { ChangeEvent, FC } from "react";

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
  // onChange: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onChange?: ChangeHandler;
}

// const MyInput: FC<IInputProps> = ({
//   label,
//   value,
//   onChange,
//   htmlFor,
//   name,
//   id,
//   type,
// }) => {
//   return (
//     <>
//       {/* <label htmlFor={htmlFor} /> */}
//       <input
//         id={id}
//         data-testid={`${name}-test-id`}
//         value={value || ""}
//         placeholder={label}
//         onChange={onChange}
//         type={type || "number" || "password"}
//         className="w-[75%] mt-1 h-[35px] outline-0 text-sm border border-gray-300 p-2 rounded-md placeholder-gray-400 "
//       />
//     </>
//   );
// };

// const Input = React.forwardRef(MyInput);

// // export default Input;

// export default Input;

function MyInput(
  { label, name, onChange, placeholder, type, onBlur }: IInputProps,
  ref: any
) {
  return (
    <>
      <label
        className="text-white dark:text-blue-950 text-[14px]"
        htmlFor={name}
      >
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
        className="w-[75%] mt-1 h-[35px] bg-white text-blue-950 dark:bg-white dark:text-blue-950  outline-0 text-sm border border-white dark:border-blue-950 p-2 rounded-md placeholder:text-blue-950  "
      />
    </>
  );
}

const Input = React.forwardRef(MyInput);

export default Input;
