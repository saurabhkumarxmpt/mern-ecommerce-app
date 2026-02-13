import API from './Api';

export const GetProducts=async(search="")=>{
    const response=await API.get(`/product?search=${search}`);
    return response.data;
};