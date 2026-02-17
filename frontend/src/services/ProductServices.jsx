import API from './Api';

export const GetProducts=async(search="")=>{
    const response=await API.get(search ? `/product?search=${search}` : `/product`);
    return response.data.products;
};