import { FC, useContext, useEffect, useState } from "react";

import {
  AiFillHeart,
  AiFillStar,
  AiOutlineStar,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
  AiFillDelete,
} from "react-icons/ai";
import ProductDetailsCart from "../productDetailsCart/productDetailsCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist.action";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart.action";
import { AiFillEdit } from "react-icons/ai";
import UpdateProductModal from "../update-order/update-order";
import {
  IResponseOrder,
  useDeleteOrderMutation,
} from "../../redux/api/order.api";
import { contextUser } from "../../context/user.context";

interface IProps {
  data: IResponseOrder;
}

const ProductsData: FC<IProps> = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({ id: 0, open: false });
  const [mutate] = useDeleteOrderMutation();
  const { wishlist } = useSelector((state: any) => state.wishlist);
  const dispatch = useDispatch();

  const { data: dateMe } = useContext(contextUser);

  const openEdit = (id: number) => {
    setEdit((prev) => ({ id: id, open: !prev.open }));
  };

  const removeFromWishlistHandler = (data: any) => {
    setClick((prev) => !prev);
    dispatch(removeFromWishlist(data) as any);
  };

  const addToWishlistHandler = (data: any) => {
    setClick((prev) => !prev);
    dispatch(addToWishlist(data) as any);
  };

  const deleteOrder = async (id: number) => {
    await mutate({ id: id });
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i: any) => i.id === data.id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data.id, wishlist]);

  const changeSetOpen = () => {
    console.log("dd", open);
    setOpen((prev) => !prev);
  };

  const { cart } = useSelector((state: any) => state.cart);

  const addToCartHandler = (id: number) => {
    console.log("cart", { cart });
    const isItemExists = cart && cart.find((i: any) => i.id === id);
    if (isItemExists) {
      console.log("already exist");
      toast.error("Item already in cart!");
    } else {
      if (data.id < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData) as any);
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div className="w-full h-[370px] bg-slate-100 shadow-sm p-3 relative cursor-pointer ">
      <div className="flex flex-col">
        <Link to={`/products/${data.id}`}>
          <img
            src={data.imgOrder}
            alt="dd"
            className="w-[90vh] h-[120px] object-cover"
          />
          <h5 className="pt-3 text-[15px] text-blue-400 pb-3">{data.name}</h5>
        </Link>
        <div className="flex items-center">
          <AiFillStar
            size={20}
            className="mr-2 cursor-pointer"
            color="f6ba00"
          />
          <AiFillStar
            size={20}
            className="mr-2 cursor-pointer"
            color="f6ba00"
          />
          <AiFillStar
            size={20}
            className="mr-2 cursor-pointer"
            color="f6ba00"
          />
          <AiOutlineStar
            size={20}
            className="mr-2 cursor-pointer"
            color="f6ba00"
          />

          {data.userId === dateMe.id && (
            <div className=" flex items-center">
              <AiFillDelete onClick={() => deleteOrder(data.id)} />
              <AiFillEdit
                size={20}
                onClick={() => openEdit(data.id)}
                className="ml-2 cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="py-2 mt-1 flex items-center justify-between">
          <div className="flex items-center">
            <h5 className="font-bold text-[18px] text-[#333] font-Roboto">
              {data.price}$
            </h5>
            <h4 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
              {data.price ? data.price + "$" : null}
            </h4>
          </div>
          <span className="text-[17px] font-[400] text-[#68d284]">
            {data.description} sold
          </span>
        </div>

        <div className="flex  items-center">
          {click ? (
            <AiFillHeart
              size={22}
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              className="absolute right-1 top-3 cursor-pointer"
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              className="absolute right-1 top-3 cursor-pointer"
              title="Add to wishlist"
            />
          )}

          <AiOutlineEye
            className="absolute right-1 top-10 cursor-pointer"
            size={22}
            color={"#333"}
            onClick={changeSetOpen}
            title="Quick View"
          />

          <AiOutlineShoppingCart
            className="absolute right-1 top-16 cursor-pointer"
            size={22}
            color={"#444"}
            onClick={() => addToCartHandler(data.id)}
            title="Add to Cart"
          />

          {open ? (
            <ProductDetailsCart
              open={open}
              setOpen={setOpen}
              dataProduct={data}
            />
          ) : null}

          {edit.open && edit.id === data.id ? (
            <UpdateProductModal
              activeOpen={"order"}
              data={data}
              open={edit}
              setOpen={setEdit}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductsData;
