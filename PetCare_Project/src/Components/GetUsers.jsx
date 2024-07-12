import React from "react";
import PetCareAPI from "../APIs/PetCareAPI";
import { useAuth } from "../Hooks/useAuth";

const GetUsers = () => {
  const { user } = useAuth();


  console.log(user.roles  );
  return (
    <>
      <h1>{user.roles}</h1>

      <button
        onClick={async () => {
          try {
            const response = await PetCareAPI.get("/RepoTest/AppUserGetAll");
            console.log(response.status);
            console.log(response.data);
          } catch (error) {
            console.error("Fetching users failed:", error);
          }
        }}
      >
        Fetch Users
      </button>
    </>
  );
};

export default GetUsers;
