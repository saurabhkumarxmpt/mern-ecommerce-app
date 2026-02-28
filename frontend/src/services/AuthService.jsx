import API from "./Api";

export const loginUser = async (userData) => {
    const res = await API.post("/user/login", userData);
    return res.data;
};

export const registerUser= async (userData) =>{
    const res=await API.post("/user/register",userData);
    return res.data;
}

export const updateProfile=async (userData) =>{
    try{
        const token= localStorage.getItem("token");

        const res=await API.put('/user/profile',
            userData,
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        return(res.data);
    }catch(err){
        console.error(err);
    }
}


