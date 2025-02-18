import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Shield,
  Calendar,
  Mail,
  Key,
  Search,
  PencilLine,
  Trash,
  UserCheck,
} from "lucide-react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../store/Features/user.feature";
import Loader from "../../../components/Loader/Loader";
import PaginationBtn from "../../../components/PaginationBtn/PaginationBtn";
import { usePagination } from "../../../utils/pagination";
import toast from "react-hot-toast";

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: usersData, isLoading } = useGetAllUsersQuery();
  const [updateUserRole, { isLoading: isloadingUpdate }] =
    useUpdateUserRoleMutation();
  const [deleteUser, { isLoading: isloadingDelete }] = useDeleteUserMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [role, setRole] = useState("");
  const [id, setId] = useState(null);
  const itemsPerPage = 5;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "translator":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const filteredUsers = usersData?.data?.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { totalPages, paginate } = usePagination(filteredUsers, itemsPerPage);
  const currentDocuments = paginate(filteredUsers, currentPage);

  const handleUpdate = (id) => {
    if (id) {
      setId(id);
      setOpenModalUpdate(true);
    }
  };

  const handleDelete = (id) => {
    if (id) {
      setId(id);
      setOpenDeleteModal(true);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!role) {
      return toast.error("Please select a role");
    }
    await updateUserRole({ id: id, data: role })
      .unwrap()
      .then((response) => {
        toast.success(response?.message);
        setOpenModalUpdate(false);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };
  const handleSubmitDelete = (e) => {
    e.preventDefault()
    deleteUser(id)
      .unwrap()
      .then((response) => {
        toast.success(response?.message);
        setOpenDeleteModal(false);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6 pt-0 max-w-7xl mx-auto">
      <Card>
        <CardHeader className="border-b border-gray-200 bg-themeColor">
          <div className="flex items-center justify-between flex-wrap gap-4 sm:flex-nowrap">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-gray-200" />
              <CardTitle className="text-white" >User Management</CardTitle>
            </div>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className='bg-themeColor pt-2'>
          <div className="mt-6 grid grid-cols-1 gap-4">
            {currentDocuments.map((user) => (
              <div
                key={user._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-5 w-5 text-gray-600" />
                      <h3 className="font-medium text-lg">{user.username}</h3>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {formatDate(user.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                    <div className="flex items-center space-x-2 text-sm">
                      <Shield
                        className={`h-4 w-4 ${
                          user.mfaEnabled ? "text-green-500" : "text-gray-400"
                        }`}
                      />
                      <span>
                        {user.mfaEnabled ? "2FA Enabled" : "2FA Disabled"}
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-row items-start sm:items-center gap-2">
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium`}
                      >
                        <button onClick={() => handleUpdate(user?._id)}>
                          <PencilLine className="h-4 w-4 text-green-500" />
                        </button>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span>
                        <button onClick={() => handleDelete(user?._id)}>
                          <Trash className="h-4 w-4 text-red-500" />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {totalPages > 1 && (
              <PaginationBtn
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* modal update  */}
      {openModalUpdate === true && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white flex m-4 flex-col  rounded-lg shadow-lg p-6 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-h-[80vh] ">
            <h2 className="text-lg font-medium mb-4">Update User</h2>
            {/* update user */}
            <form onSubmit={handleSubmitUpdate} className="h-full">
              <div className="flex flex-col justify-between h-full">
                {/* Input 1: update */}
                <div className="mt-2">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    name="role"
                    id=""
                    className="mt-1 py-3 px-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-md"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="translator">Translator</option>
                    <option value="user">User</option>
                  </select>
                  {role === "" ? (
                    <div className="text-red-500 text-sm">
                      <p>role is required !</p>
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={isloadingUpdate}
                    className="px-4 py-2 w-full bg-themeColor text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    {isloadingUpdate ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setOpenModalUpdate(false)}
                    className="px-4 py-2 w-1/3 bg-themeColor text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* modal delete  */}
      {openDeleteModal === true && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white flex m-4 flex-col  rounded-lg shadow-lg p-6 w-full sm:w-2/3 md:w-1/2 lg:w-1/4 max-h-[80vh] ">
            {/* update user */}
            <form onSubmit={handleSubmitDelete} className="h-full">
              <div className="flex flex-col justify-between h-full">
                {/* Input 1: Remove */}
                <div className="mt-2 text-center">
                  <h1 className="text-lg font-medium mb-4 ">Are you sure you want to delete this user?</h1>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={isloadingDelete}
                    className="px-4 py-2 w-full bg-themeColor text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    {isloadingDelete ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setOpenDeleteModal(false)}
                    className="px-4 py-2 w-1/3 bg-themeColor text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
