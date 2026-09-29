import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaBuilding,
  FaTasks,
  FaHandsHelping,
  FaChartBar,
  FaMoneyBillAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { FaGear, FaUserGroup } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";

const sidebarItems = [
  { id: 1, icon: <FiHome />, label: "Dashboard", path: "/" },
  { id: 2, icon: <FaBuilding />, label: "Company", path: "/company" },
  { id: 3, icon: <FaUser />, label: "Users", path: "/users" },
  { id: 4, icon: <FaTasks />, label: "Project", path: "/project" },
  { id: 5, icon: <FaUserGroup />, label: "Employee", path: "/employee" },
  { id: 6, icon: <FaHandsHelping />, label: "Partner", path: "/partner" },
  {
    id: 7,
    icon: <BiSolidCategoryAlt />,
    label: "Product Category",
    path: "/product-category",
  },
  { id: 8, icon: <AiFillProduct />, label: "Products", path: "/products" },
  { id: 9, icon: <FaChartBar />, label: "Chart of Account", path: "/chart" },
  { id: 10, icon: <FaMoneyBillAlt />, label: "Payroll", path: "/payroll" },
  { id: 11, icon: <FaGear />, label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-white bg-[#4D44B5] p-1 rounded"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 bg-[#4D44B5] h-screen text-white z-40 transform
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex
          w-[250px] lg:w-[300px] flex-col
        `}
      >
        {/* Logo & Heading */}
        <div className="flex items-center gap-3 mb-8 mt-12 ml-6 lg:ml-12 sm:mt-12">
          <div className="w-[34px] h-[34px] bg-[#FB7D5B] flex items-center justify-center text-white font-extrabold text-2xl rounded-md">
            E
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold">E-C-P</h2>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-1 ml-6 md:ml-10 lg:ml-12">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 cursor-pointer transition-all rounded-l-[2rem] ${
                  isActive
                    ? "bg-white text-[#4D44B5]"
                    : "text-white hover:bg-white/10"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm md:text-base">{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-auto mx-6 md:mx-8 mb-6 pt-5 border-t border-white/15">
          <div className="text-white/90 text-sm font-semibold">
            Multi-Company ERP
          </div>

          <div className="text-white/50 text-xs mt-1">
            Business Management System
          </div>

          <div className="text-white/40 text-[11px] mt-3">
            © E-C-P
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
