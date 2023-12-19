import React, { useState } from "react";
import Login from "../components/login/login";
import Sign from "../components/sign/sign";

const AuthPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  return <>{open ? <Login setOpen={setOpen} /> : <Sign setOpen={setOpen} />}</>;
};

export default AuthPage;
