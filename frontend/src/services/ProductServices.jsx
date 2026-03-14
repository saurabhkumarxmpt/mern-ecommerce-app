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

        const token=localStorage.getItem("adminToken");
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

export const updateProduct = async (id,productData)=>{
    try{
        const token=localStorage.getItem("adminToken");
        const res=await API.put(`/product/update/${id}`,
            productData,
            {
            headers:{
                    "Content-Type": "multipart/form-data",
                     Authorization: `Bearer ${token}`
                }

            }
        );
        return res.data;
    }catch(err){
        console.log(err.message);
    }
}

export const deleteProduct = async (id) => {
  try {
    const res = await API.delete(`/product/delete-product/${id}`);
    return res.data;
  } catch (err) {
    console.log("Delete Product Error:", err.message);
  }
};
