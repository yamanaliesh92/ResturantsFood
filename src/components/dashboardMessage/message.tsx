import text from "../../img/photo.jpeg";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { dataMessage, IDataMessage } from "../../sataic/message.data";
import { FC } from "react";

interface IProps {
  openMessage: {
    openConversation: boolean;
    id: number;
  };
}

const Message: FC<IProps> = ({ openMessage }) => {
  return (
    <div className="flex flex-col p-2 h-[550px]">
      {dataMessage.map((item) => {
        return (
          <>
            {openMessage.id === item.user.id && (
              <>
                <div className="flex h-[10%] items-center  justify-between border-b-4 ">
                  <div className="flex items-center">
                    <img
                      src={item.user.img}
                      // src={text}
                      alt="ds"
                      className="w-[50px] h-[50px] rounded-full object-cover mr-2"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-bold ml-2 mb-2">
                        {item.user.username}
                      </h1>
                      <p className="mb-2">1 days ago</p>
                    </div>
                  </div>
                  <AiOutlineArrowRight cursor={"pointer"} size={30} />
                </div>
              </>
            )}
          </>
        );
      })}
      {/* <div className="flex h-[10%] items-center  justify-between border-b-4 ">
        <div className="flex items-center">
          <img
            // src={dataMessage.user.img}
            src={text}
            alt="ds"
            className="w-[50px] h-[50px] rounded-full object-cover mr-2"
          />
          <div className="flex flex-col">
            <h1 className="font-bold ml-2 mb-2">ali</h1>
            <p className="mb-2">1 days ago</p>
          </div>
        </div>
        <AiOutlineArrowRight cursor={"pointer"} size={30} />
      </div> */}

      {/* <div className="flex flex-col  mt-3  h-[75%] overflow-y-scroll">
        <div className="flex place-self-end mt-2 w-auto">
          <div className="relative">
            <img
              src={text}
              alt="dd"
              className="w-[50px] h-[50px] rounded-full object-cover mr-2"
            />
            <div className="w-[12px] h-[12px] bg-green-500 rounded-full absolute top-[2px] right-[2px]" />
          </div>
          <div className="flex flex-col bg-gray-400  w-auto h-auto p-2 ml-2 rounded-md">
            <p className="font-[400] text-[#000000a7]">het</p>
            <p className="text-[#000000a7] text-[14px]">2 days ago</p>
          </div>
        </div>

        {/* <div className="flex items-start  mb-2">
          <div className="relative">
            <img
              src={text}
              alt="dd"
              className="w-[50px] h-[50px] rounded-full object-cover mr-2"
            />
            <div className="w-[12px] h-[12px] bg-green-500 rounded-full absolute top-[2px] right-[2px]" />
          </div>
          <div className="flex flex-col bg-gray-400  w-auto h-auto p-2 ml-2 rounded-md">
            <p className="font-[400] text-[#000000a7]">how are yoi</p>
            <p className="text-[#000000a7] text-[14px]">2 days ago</p>
          </div>
        </div>

        <div className="flex items-start w-auto mb-2">
          <div className="relative">
            <img
              src={text}
              alt="dd"
              className="w-[50px] h-[50px] rounded-full object-cover mr-2"
            />
            <div className="w-[12px] h-[12px] bg-green-500 rounded-full absolute top-[2px] right-[2px]" />
          </div>
          <div className="flex flex-col  bg-gray-400  w-auto h-auto p-2 ml-2 rounded-md">
            <p className="font-[400] text-[#000000a7]">how are yoi</p>
            <p className="text-[#000000a7] text-[14px]">2 days ago</p>
          </div>
        </div> */}
      {/* </div> */}
      <div className="flex items-center justify-between mt-2">
        <input
          className="t w-[90%] h-[35px] p-3 outline-none rounded-md"
          placeholder="write something"
        />
        <AiOutlineSend size={25} className="cursor-pointer mr-4" />
      </div>
    </div>
  );
};

export default Message;
