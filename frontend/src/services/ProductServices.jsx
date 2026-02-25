import API from './Api';

export const GetProducts=async(params={})=>{
    const quiryString=new URLSearchParams(params).toString();
    const response=await API.get(`/product?${quiryString}`);
    return response.data;
};


export const GetSingleProduct=async(id)=>{
    try{
        const response=await API.get(`/product/${id}`);
        return response.data;
    } catch(err){
        console.error(err)
        throw err;
    }
}

export const GetRelatedProducts=async(id)=>{
    try{
        const response=await API.get(`/product/related/${id}`);
        return response.data
    }catch(err){
        console.error(err);
        throw err;
    }
}