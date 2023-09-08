import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { UserInformation } from "../types";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [userInformation,setUserInformation]= useState<UserInformation|null>(null);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userInformation} />
      <FunctionalForm setUserInformation={setUserInformation} />
    </>
  );
};
