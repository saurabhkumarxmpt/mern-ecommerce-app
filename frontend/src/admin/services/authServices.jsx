import API from "./AdminApi"

export const loginAdmin=async(adminData)=>{
    const res=await API.post('/auth/login',adminData);
    return res.data;
}