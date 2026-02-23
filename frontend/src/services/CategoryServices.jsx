import API from "./Api";


export const Category=async()=>{
        const responce=await API.get('/category');
        return responce.data;
}