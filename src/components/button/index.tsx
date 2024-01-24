import ClipLoader from "react-spinners/ClipLoader";
import { FC, PropsWithChildren } from "react";

const Button: FC<
  PropsWithChildren<{ isLoading?: boolean; bg?: string; onClick?: () => void }>
> = ({ children, bg, onClick, isLoading }) => {
  console.log("bg", bg);
  return (
    <button
      onClick={onClick}
      className={`sm:w-[60px] ${
        bg ? bg : "bg-white"
      } md:w-[120px] p-2 flex items-center justify-center dark:${
        bg ? bg : "bg-dark"
      } ${
        bg ? "text-white" : "text-dark"
      }  dark:text-white  my-3 rounded-md cursor-pointer`}
    >
      {!isLoading ? (
        children
      ) : (
        <ClipLoader
          color={"gray"}
          loading={isLoading}
          size={18}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </button>
  );
};

export default Button;
