import PetCareAPI from "../../APIs/PetCareAPI";






export const FetchVet =async (id)=>{
    try{

        const response = await PetCareAPI.get(
            "/vets/GetVet",
        {
       params:{
           Id : id
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
}
catch(error){
    console.log(`error happened:${error}`)
}
}
