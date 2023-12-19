import React, { useState } from "react";
import ProfileContent from "../components/profileContent/profileContent";
import ProfileSide from "../components/profileSide/profileSide";

const ProfilePage = () => {
  const [active, setActive] = useState<number>(0);
  return (
    <div className="w-11/12 mx-2 sm:mx-auto flex py-10 bg-[#f5f5f5]">
      <div className="w-[320px]">
        <ProfileSide active={active} setActive={setActive} />
      </div>
      <ProfileContent active={active} setActive={setActive} />
    </div>
  );
};

export default ProfilePage;
