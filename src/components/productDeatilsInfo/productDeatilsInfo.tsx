import { FC, useState } from "react";
import { IProductData } from "../../sataic/product.data";

interface IProps {
  data: IProductData | undefined;
}

const ProductDetailsInfo: FC<IProps> = () => {
  const [active, setActive] = useState<number>(0);
  return (
    <div className=" w-11/12 mx-auto 800px:w-[80%]  p-4 h-[40vh] rounded-xl bg-gray-600">
      <div className="w-full flex   justify-between">
        <div className="relative">
          <h4
            onClick={() => setActive(1)}
            className="text-[#000] font-[600] cursor-pointer"
          >
            Product Details
          </h4>
          {active === 1 ? (
            <div className="absolute bottom-[-27%] left-0 h-[3px] w-full bg-[crimson]" />
          ) : null}
        </div>
        <div className="relative">
          <h4
            onClick={() => setActive(2)}
            className="text-[#000] font-[600] cursor-pointer"
          >
            Product Details
          </h4>
          {active === 2 ? (
            <div className="absolute bottom-[-27%] left-0 h-[3px] w-full bg-[crimson] transition-all" />
          ) : null}
        </div>
        <div className="relative">
          <h4
            onClick={() => setActive(3)}
            className="text-[#000] font-[600] cursor-pointer"
          >
            Product Details
          </h4>
          {active === 3 ? (
            <div className="absolute bottom-[-27%] left-0 h-[3px] w-full bg-[crimson]" />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <p className="text-[18px] p-2 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolorem
          laborum dolores, accusamus itaque consequatur explicabo expedita alias
          sit incidunt nostrum temporibus recusandae, perferendis illum nobis
          assumenda distinctio ratione nam.
        </p>
      ) : null}

      {active === 2 ? (
        <h1 className="flex w-full min-h-[60%] items-center justify-center font-bold text-[#000]">
          No Review Yet
        </h1>
      ) : null}
    </div>
  );
};

export default ProductDetailsInfo;
