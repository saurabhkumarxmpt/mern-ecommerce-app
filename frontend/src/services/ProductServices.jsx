import API from './Api';

export const GetProducts=async(params={})=>{
    const quiryString=new URLSearchParams(params).toString();
    const response=await API.get(`/product?${quiryString}`);
    return response.data;
};