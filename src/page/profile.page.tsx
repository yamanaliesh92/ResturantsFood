import React, { useState } from "react";
import ProfileContent from "../components/profileContent/profileContent";
import ProfileSide from "../components/profileSide/profileSide";
import UpdateInfo from "../components/update-info/updateInfo";

const ProfilePage = () => {
  const [active, setActive] = useState<number>(0);
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <div className="flex w-full  justify-between">
      <div className="w-[150px] flex items-center justify-center p-5 sm:w-[330px]">
        {/* 800px:w-[100px] */}
        <ProfileSide active={active} setActive={setActive} />
      </div>
      <div className="w-full p-10 flex items-center justify-center  h-[450px]">
        {!edit ? (
          <ProfileContent
            active={active}
            setEdit={setEdit}
            setActive={setActive}
          />
        ) : (
          <UpdateInfo setEdit={setEdit} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
