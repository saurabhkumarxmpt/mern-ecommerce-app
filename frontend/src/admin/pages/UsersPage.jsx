import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/AuthService";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();

      // ❌ admin remove
      const filteredUsers = res.users.filter(
        (user) => user.role !== "admin"
      );

      setUsers(filteredUsers || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Users Overview
      </h2>

      {/* Table Container */}
      <div className="bg-gray-50 shadow-sm rounded-sm border border-gray-200 overflow-hidden">

        <table className="w-full text-sm text-gray-600">
          
          {/* Table Head */}
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Joined</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-100 border-gray-200 transition"
              >
                <td className="p-3">{index + 1}</td>

                <td className="p-3 font-medium text-gray-800">
                  {user.name}
                </td>

                <td className="p-3">{user.email}</td>

                <td className="p-3">
                  <span className="px-2 py-1 text-xs rounded-sm bg-green-100 text-green-600 font-medium">
                    {user.role || "User"}
                  </span>
                </td>

                <td className="p-3 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No users found
          </div>
        )}

      </div>
    </div>
  );
};

export default Users;
