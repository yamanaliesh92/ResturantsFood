import React, { useState } from "react";
import Login from "../components/login/login";
import Sign from "../components/sign/sign";

const AuthPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="w-full flex items-center justify-center h-screen">
      {open ? <Login setOpen={setOpen} /> : <Sign setOpen={setOpen} />}
    </div>
  );
};

export default AuthPage;
