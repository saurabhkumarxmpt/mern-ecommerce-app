import { useState,useEffect } from "react";
import { Eye, Hand, Pencil, Trash2 } from "lucide-react";
import {Category,createCategory,updateCategory} from '../../services/CategoryServices';
import toast from
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

  useEffect(()=>{

    const getAllCategories=async()=>{
      try{
        const res=await Category();
        setCategory(res.category);
        console.log(res);
      }catch(err){
        console.log(err.meesage);
      }

    }

    getAllCategories();

  },[])

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const res= await createCategory(formData);
      alert(res.message);
      setOpenAddModal(false);
      getAllCategories();
    }catch(err){
      console.log(err);
    }
  }
  const handleUpdate = async () => {
  const toastId = toast.loading("Updating category...");

  try {
    const res = await updateCategory(editCategory._id, {
      name: editCategory.name,
    });

    // 🔥 UI update without refresh
    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === editCategory._id ? res.category : cat
      )
    );

    toast.success("✏️ Category updated successfully!", {
      id: toastId,
    });

    setEditCategory(null); // close modal

  } catch (error) {
    toast.error("Failed to update category!", {
      id: toastId,
    });
  }
};


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

            {category.map((cat, index) => (

              <tr key={cat.id} className="border-t border-gray-300">

                <td className="p-4">{index + 1}</td>

                <td className="p-4 text-gray-700">
                  {cat.name}
                </td>

                <td className="p-4 text-gray-500">
                  {cat.description}
                </td>

                {/* Action */}

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
                      onClick={() => setEditCategory(cat)}
                      className="text-green-600 hover:scale-110 transition"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Delete */}

                    <button
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Add Category Modal */}

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

                <label className="text-sm text-gray-600">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-sm mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              <div>

                <label className="text-sm text-gray-600">
                  Description
                </label>

                <textarea
                  name="description"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-sm mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>

              </div>

              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-sm"
              >
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

                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="text-gray-700 font-medium">
                  {viewCategory.name}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Description
                </p>

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

            <form className="space-y-4">

              <div>

                <label className="text-sm text-gray-600">
                  Name
                </label>

                <input
                  type="text"
                  defaultValue={editCategory.name}
                  className="w-full border border-gray-300 p-2 rounded-sm mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              <div>

                <label className="text-sm text-gray-600">
                  Description
                </label>

                <textarea
                  defaultValue={editCategory.description}
                  className="w-full border border-gray-300 p-2 rounded-sm mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>

              </div>

              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-sm"
              >
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
