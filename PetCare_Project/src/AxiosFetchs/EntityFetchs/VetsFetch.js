import PetCareAPI from "../../APIs/PetCareAPI";

export const FetchVets = async () => {
  const response = await PetCareAPI.get(
    "/RepoTest/GetAllByRole",
    {
     params:{
        roleName: "Vet",
     }
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return response.data;
};
