import API from "./Api";

export const HomePage=async()=>{
    const response=await API.get('/product/homepageproducts');
    return response.data;
};