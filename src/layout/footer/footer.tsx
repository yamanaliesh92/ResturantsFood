import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../sataic/footer.data";

const Footer = () => {
  return (
    <div className="d bg-[#000] text-white mt-4">
      <div className="md:flex items-center justify-between sm:px-5  py-4 bg-[#342ac8]">
        <h1 className="d lg:text-4xl mb-5">
          <span className="text-[#56b879]">Subscribe </span>
          us for get news <br /> event and offers
        </h1>
        <div className="flex items-center">
          <input
            required
            placeholder="enter your email..."
            className="h-[40px] my-2 text-gray-800 outline-none border-none w-full border-[#3957db]
          border-[2px] rounded-md"
          />

          <button className="bg-[#000] ml-2 text-white rounded-md hover:bg-white hover:text-[#000] duration-300 px-4 py-2 md:w-auto ">
            login
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:px-7 px-5 py-18 gap-3">
        <ul className="px-5  flex flex-col items-start sm:text-start">
          <img
            alt="od"
            style={{ marginTop: "20px" }}
            src={"https://shopo.quomodothemes.website/assets/images/logo.svg"}
          />
          <br />
          <p>The Home and element needed to create beautiful product</p>
          <div className="flex items-center mt-4 mb-2">
            <AiFillFacebook
              size={25}
              style={{ marginRight: "20px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginRight: "20px", cursor: "pointer" }}
            />
            <AiOutlineWhatsApp size={25} style={{ cursor: "pointer" }} />
          </div>
        </ul>
        <ul className="text-center  sm:text-start">
          <h1 className="mb-1 font-bold mt-5 text-[22px]">company</h1>

          {footerProductLinks.map((item) => {
            return (
              <h1 className="text-[14px] cursor-pointer items-center text-yellow-100 hover:text-[#34b789]">
                {item.name}{" "}
              </h1>
            );
          })}
        </ul>
        <ul className="text-center  sm:text-start">
          <h1 className="mb-1 font-bold mt-5 text-[22px]">Shop</h1>

          {footercompanyLinks.map((item) => {
            return (
              <h1 className="text-[14px] cursor-pointer items-center text-yellow-100 hover:text-[#34b789]">
                {item.name}{" "}
              </h1>
            );
          })}
        </ul>
        <ul className="text-center  sm:text-start">
          <h1 className="mb-1 font-bold mt-5 text-[22px]">Support</h1>

          {footerSupportLinks.map((item) => {
            return (
              <h1 className="text-[14px] cursor-pointer items-center text-yellow-100 hover:text-[#34b789]">
                {item.name}{" "}
              </h1>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Footer;