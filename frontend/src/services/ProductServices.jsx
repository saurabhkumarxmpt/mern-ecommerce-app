import API from './Api';

//get the products by user searching
export const GetProducts=async(params={})=>{
    const quiryString=new URLSearchParams(params).toString();
    const response=await API.get(`/product?${quiryString}`);
    return response.data;
};


//get a single product
export const GetSingleProduct=async(id)=>{
    try{
        const response=await API.get(`/product/${id}`);
        return response.data;
    } catch(err){
        console.error(err)
        throw err;
    }
}

//get the related products on the product detail page
export const GetRelatedProducts=async(id)=>{
    try{
        const response=await API.get(`/product/related/${id}`);
        return response.data
    }catch(err){
        console.error(err);
        throw err;
    }
}


//create a new product by the only admin
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


//get the all products for the admin panal
export const Allproducts=async()=>{
    try{
        const res=await API.get('/product/allproducts');

        return res.data;
    }catch(err){
        console.error(err.message);
    }
}


//update the single product
export const updateProduct = async (id,formData)=>{
    try{
        const token=localStorage.getItem("adminToken");
        const res=await API.put(`/product/update/${id}`,
            formData,
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


//delete the a single product
export const deleteProduct = async (id) => {
  try {
    const res = await API.delete(`/product/delete-product/${id}`);
    return res.data;
  } catch (err) {
    console.log("Delete Product Error:", err.message);
  }
};
