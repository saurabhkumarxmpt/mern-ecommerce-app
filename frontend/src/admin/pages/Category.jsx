import { useState,useEffect } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {Category,createCategory,updateCategory,deleteCategory} from '../../services/CategoryServices';
import toast from "react-hot-toast";

const Categories = () => {

  const[category,setCategory]=useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [viewCategory, setViewCategory] = useState(null);
  const [editCategory, setEditCategory] = useState(null); 

  const [formData,setFormData]=useState({
    name:"",
    description:""
  });

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

  // ================= GET ALL =================
  const getAllCategories=async()=>{
    try{
      const res=await Category();
      console.log(res);

      setCategory(Array.isArray(res.category) ? res.category : []);
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    getAllCategories();
  },[]);
  
  // ================= ADD =================
  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(!formData.name.trim()){
      return toast.error("Category name is required");
    }

    try{
      const res= await createCategory(formData);

      toast.success(res.message || "Category added");
      setOpenAddModal(false);

      setFormData({ name:"", description:"" });

      getAllCategories();
    }catch(err){
      toast.error("Failed to add category");
    }
  }

  // ================= UPDATE =================
  const handleCategory=async(e)=>{
    e.preventDefault();

    if(!formData.name.trim()){
      return toast.error("Category name is required");
    }

    const toastId = toast.loading("Updating category...");

    try{
      const res = await updateCategory(editCategory._id,formData);

      // 🔥 UI update without refresh
      setCategory((prev) =>
        prev.map((cat) =>
          cat._id === editCategory._id
            ? (res.category || formData)
            : cat
        )
      );

      toast.success("Category updated successfully", { id: toastId });

      setEditCategory(null);
      setFormData({ name:"", description:"" });

    }catch(err){
      toast.error("Update failed", { id: toastId });
    }
  }

  // ================= DELETE =================
  const handleDelete=async(id)=>{

    const confirmDelete=window.confirm("Delete this category?");

    if(!confirmDelete){
      toast.error("you cancel delete")
    }

    const toastId=toast.loading("Deleting category...");

    try{
      await deleteCategory(id);
      setCategory((prev) => prev.filter((cat) => cat._id !== id));

      toast.success("Category deleted successfully", { id: toastId });
    }catch(error){
      toast.error("Delete failed", { id: toastId });
    }

  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-xl font-medium text-gray-700">
          Category Management
        </h1>

        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-sm"
        >
          Add Category
        </button>

      </div>

      {/* Table */}
      <div className="bg-white border border-gray-300 rounded-sm overflow-hidden">

        <table className="w-full text-sm text-gray-700">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left font-semibold">#</th>
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Description</th>
              <th className="p-4 text-right font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {category?.map((cat, index) => {
              if(!cat) return null;

              return (
                <tr key={cat._id} className="border-t border-gray-300">

                  <td className="p-4">{index + 1}</td>

                  <td className="p-4 text-gray-700">
                    {cat?.name}
                  </td>

                  <td className="p-4 text-gray-500">
                    {cat?.description}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-4">

                      {/* View */}
                      <button
                        onClick={() => setViewCategory(cat)}
                        className="text-blue-600 hover:scale-110 transition"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => {
                          setEditCategory(cat);
                          setFormData({
                            name:cat.name,
                            description:cat.description
                          });
                        }}
                        className="text-green-600 hover:scale-110 transition"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={()=>handleDelete(cat._id)}
                        className="text-red-500 hover:scale-110 transition"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>

      </div>

      {/* Add Modal */}
      {openAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-[500px] p-6 rounded-sm relative">

            <button
              onClick={() => setOpenAddModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-lg font-medium mb-6">
              Add Category
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>

              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-sm mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-sm mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-sm">
                Save Category
              </button>

            </form>

          </div>

        </div>
      )}

      {/* View Modal */}
      {viewCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-[450px] p-6 rounded-sm relative">

            <button
              onClick={() => setViewCategory(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-lg font-medium mb-6">
              Category Details
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-gray-700 font-medium">
                  {viewCategory.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-700">
                  {viewCategory.description}
                </p>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Edit Modal */}
      {editCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-[500px] p-6 rounded-sm relative">

            <button
              onClick={() => setEditCategory(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-lg font-medium mb-6">
              Edit Category
            </h2>

            <form className="space-y-4" onSubmit={handleCategory}>

              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-sm mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-sm mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-sm">
                Update Category
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default Categories;
