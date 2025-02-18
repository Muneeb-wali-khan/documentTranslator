import React from "react";
import {
  FaFileAlt,
  FaListAlt,
  FaTimesCircle,
  FaCheckCircle,
  FaUser,
  FaUsersCog,
  FaShieldAlt,
} from "react-icons/fa";
import { useAllDocumentsAQuery } from "../../store/Features/documents.feature";
import Loader from "../../components/Loader/Loader";
import { useGetAllUsersQuery } from "../../store/Features/user.feature";

function DashBoardA() {
  const { data: AllDocuments, isLoading } = useAllDocumentsAQuery();
  const { data: AllUsers, isLoading: isloadingUser } = useGetAllUsersQuery();

  const totalDocuments = AllDocuments?.data.length || 0;
  const totalRequestsPendings =
    AllDocuments?.data.filter((doc) => doc.status === "pending").length || 0;
  const totalRejected =
    AllDocuments?.data.filter((doc) => doc.certificationStatus === "rejected").length || 0;
  const totalApproved =
    AllDocuments?.data.filter((doc) => doc.status === "translated").length || 0;
    const totalUsers = AllUsers?.data.length || 0;
    const totalTranslators = AllUsers?.data.filter((user) => user.role === "translator").length || 0;
    const totalAdmins = AllUsers?.data.filter((user) => user.role === "admin").length || 0;
    const totalUserRole = AllUsers?.data.filter((user) => user.role === "user").length || 0;

  const cards = [
    {
      title: "Total Document",
      value: totalDocuments,
      color: "bg-themeColor",
      icon: <FaFileAlt size={30} className="text-blue-500" />,
    },
    {
      title: "Total Pendings",
      value: totalRequestsPendings,
      color: "bg-themeColor",
      icon: <FaListAlt size={30} className="text-yellow-500" />,
    },
    {
      title: "Rejected",
      value: totalRejected,
      color: "bg-themeColor",
      icon: <FaTimesCircle size={30} className="text-red-500" />,
    },
    {
      title: "Approved",
      value: totalApproved,
      color: "bg-themeColor",
      icon: <FaCheckCircle size={30} className="text-green-500" />,
    },
    {
      title: "Total Users",
      value: totalUsers,
      color: "bg-themeColor",
      icon: <FaUser size={30} className="text-green-500" />,
    },
    {
      title: "Translators",
      value: totalTranslators,
      color: "bg-themeColor",
      icon: <FaUsersCog size={30} className="text-green-500" />,
    },
    {
      title: "Admins",
      value: totalAdmins,
      color: "bg-themeColor",
      icon: <FaShieldAlt size={30} className="text-green-500" />,
    },
    {
      title: "Users",
      value: totalUserRole,
      color: "bg-themeColor",
      icon: <FaCheckCircle size={30} className="text-green-500" />,
    },
  ];

  if (isLoading || isloadingUser) {
    return <Loader />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {/* cooler title add effects colors*/}
      <div className="col-span-full text-left mb-8">
        <h1
          className="text-5xl font-extrabold text-gray-900 
                 tracking-tight bg-gradient-to-r from-gray-800 via-gray-500 to-gray-900 
                 text-transparent bg-clip-text drop-shadow-xl"
        >
          🚀 Dashboard Admin
        </h1>
        {/* <p className="text-base mt-3 p-2 text-gray-50 rounded-md bg-gradient-to-r from-blue-500 via-pink-500 to-red-500mt-2">
          Manage your translations with speed and efficiency.
        </p> */}
      </div>

      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-6 rounded-2xl shadow-lg text-white ${card.color} transition transform hover:scale-105 flex items-center space-x-4`}
        >
          {card.icon}
          <div>
            <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashBoardA;
