import API from "./Api";


//cearte a new category
export const createCategory=async(formdata)=>{
        try{
                const res=await API.post('/category/create',formdata);
                return res.data;
        }catch(err){
                console.log(err.message)
        }
}

//get all Categories, path /api/category
export const Category=async()=>{
        const responce=await API.get('/category');
        return responce.data;
}

//update the category

export const updateCategory=async(id,data)=>{
        const res=await API.put(`/category/update/${id}`,data);
        return res.data;
}



//delete category

export const deleteCategory=async(id)=>{
        const res=await API.delete(`/category/delete/${id}`);
        return res.data;
}