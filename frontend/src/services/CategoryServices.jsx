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
