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


export const createProduct=async(productData)=>{
    try{

        const token=localStorage.getItem("token");
        const res=await API.post('/product/create', 
            productData,
            {
                headers:{
                    "Content-Type": "multipart/form-data",
                     Authorization: `Bearer ${token}`
                }
            }
        
        )

        return res.data;
    }catch(err){
        console.error(err.message);
    }
}

export const Allproducts=async()=>{
    try{
        const res=await API.get('/product/allproducts');

        return res.data;
    }catch(err){
        console.error(err.message);
    }
}