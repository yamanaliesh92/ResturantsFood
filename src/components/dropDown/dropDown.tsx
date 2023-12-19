import React, { Dispatch, FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { ICategoriesData } from "../../sataic/categorise.data";

interface IProps {
  data: ICategoriesData[];
  setDrop: Dispatch<SetStateAction<boolean>>;
  drop: boolean;
}

const DropDown: FC<IProps> = ({ data, setDrop, drop }) => {
  const navigate = useNavigate();

  const handelSubmit = (i: ICategoriesData) => {
    navigate(`products?category=${i.title}`);
    setDrop(false);
    window.location.reload();
  };

  return (
    <div className="w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {data
        ? data.map((i) => {
            return (
              <div
                onClick={() => handelSubmit(i)}
                key={i.id}
                className="f flex items-center cursor-pointer hover:bg-gray-500"
              >
                <img
                  src={i.image_Url}
                  alt="imgCart"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "20px",
                    objectFit: "contain",
                    marginLeft: "10px",
                  }}
                />
                <h3 className="s cursor-pointer m-3 select-none">{i.title}</h3>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default DropDown;
