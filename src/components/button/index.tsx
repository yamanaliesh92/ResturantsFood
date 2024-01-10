import ClipLoader from "react-spinners/ClipLoader";
import { FC, PropsWithChildren } from "react";

const Button: FC<
  PropsWithChildren<{ isLoading?: boolean; onClick?: () => void }>
> = ({ children, onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      className="sm:w-[60px] md:w-[120px] p-2 flex items-center justify-center bg-white text-blue-950 dark:bg-blue-950 dark:text-white  my-3 rounded-md cursor-pointer"
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
