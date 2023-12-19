import { AiOutlineDelete } from "react-icons/ai";

const MethodPayment = () => {
  return (
    <div className=" w-full flex items-center flex-col p-5">
      <div className=" w-[90%] flex justify-between items-center">
        <h1 className="text-[25px] font-[600] font-Roboto text-[#333]'">
          Payment Method
        </h1>
        <button className="w-[150px] bg-black h-[50px] my-3 text-white rounded-xl cursor-pointer">
          Add
        </button>
      </div>

      <div className="w-[90%] p-4 h-[60px] bg-yellow-50 rounded-md flex items-center justify-between">
        <h1 className="font-[600]">Visa Icon</h1>
        <div className="flex items-center">
          <h4 className="font-[bold] mr-2">1234 ***** ***</h4>
          <h4 className="font-[bold]">sharing</h4>
        </div>
        <AiOutlineDelete size={30} cursor="Pointer" />
      </div>
    </div>
  );
};

export default MethodPayment;
