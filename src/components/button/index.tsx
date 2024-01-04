import ClipLoader from "react-spinners/ClipLoader";
import { FC, PropsWithChildren } from "react";

const Button: FC<PropsWithChildren<{ isLoading?: boolean }>> = ({
  children,
  isLoading,
}) => {
  return (
    <button className="sm:w-[60px] md:w-[90px] p-2 flex items-center justify-center text-yellow-50 bg-black my-3 rounded-md cursor-pointer">
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
