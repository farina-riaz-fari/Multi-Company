import React, { useContext, useMemo, useState } from "react";
import {
  FaEdit,
  FaPlus,
  FaTrashAlt,
  FaSearch,
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import { EmployeeContext } from "../../store/EmployeeContext";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import Button from "../../components/Button";
import DeletePopup from "../../components/DeletePopup/deletepopup";
import placeholderImage from "../../assets/placeholder.png";

const Employee = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [employmentFilter, setEmploymentFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { employees, deleteEmployee } =
    useContext(EmployeeContext);

  const navigate = useNavigate();

  const itemsPerPage = 6;

  //Status helpers

  const isActive = (status = "") =>
    status.toLowerCase() === "active";

  const getStatusType = (status = "") => {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "active") {
      return "active";
    }

    if (
      normalizedStatus === "resigned" ||
      normalizedStatus === "terminated"
    ) {
      return "separated";
    }

    return "other";
  };

  //Statistics

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter((employee) =>
    isActive(employee.status)
  ).length;

  const otherEmployees = employees.filter(
    (employee) => !isActive(employee.status)
  ).length;

  //Employment filter options

  const employmentTypes = useMemo(() => {
    const types = employees
      .map((employee) => employee.employment_type)
      .filter(Boolean);

    return ["All", ...new Set(types)];
  }, [employees]);

  //Search + filters

  const filteredEmployees = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return employees.filter((employee) => {
      const searchableText = `
        ${employee.first_name || ""}
        ${employee.last_name || ""}
        ${employee.employee_code || ""}
        ${employee.job_title || ""}
        ${employee.employment_type || ""}
        ${employee.email || ""}
      `.toLowerCase();

      const matchesSearch =
        searchableText.includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" &&
          isActive(employee.status)) ||
        (statusFilter === "Other" &&
          !isActive(employee.status));

      const matchesEmployment =
        employmentFilter === "All" ||
        employee.employment_type === employmentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesEmployment
      );
    });
  }, [
    employees,
    searchQuery,
    statusFilter,
    employmentFilter,
  ]);

  //Pagination

  const totalPages = Math.ceil(
    filteredEmployees.length / itemsPerPage
  );

  const safeCurrentPage =
    totalPages > 0
      ? Math.min(currentPage, totalPages)
      : 1;

  const startIndex =
    (safeCurrentPage - 1) * itemsPerPage;

  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const showingFrom =
    filteredEmployees.length === 0
      ? 0
      : startIndex + 1;

  const showingTo = Math.min(
    startIndex + itemsPerPage,
    filteredEmployees.length
  );

  const changeSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const changeStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
    setFilterOpen(false);
  };

  const changeEmploymentFilter = (value) => {
    setEmploymentFilter(value);
    setCurrentPage(1);
    setFilterOpen(false);
  };

  //Delete

  const handleDelete = () => {
    if (selectedEmployee) {
      deleteEmployee(selectedEmployee.employee_code);
    }

    setSelectedEmployee(null);
    setShowDeletePopup(false);

    if (
      paginatedEmployees.length === 1 &&
      safeCurrentPage > 1
    ) {
      setCurrentPage(safeCurrentPage - 1);
    }
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    setShowDeletePopup(false);
  };

  //Status styling

  const getStatusStyles = (status = "") => {
    const type = getStatusType(status);

    if (type === "active") {
      return {
        dot: "bg-emerald-400",
        text: "text-emerald-600",
      };
    }

    if (type === "separated") {
      return {
        dot: "bg-red-400",
        text: "text-red-500",
      };
    }

    return {
      dot: "bg-orange-400",
      text: "text-orange-500",
    };
  };

  //Employee card

  const EmployeeCard = ({ employee }) => {
    const statusStyles = getStatusStyles(
      employee.status
    );

    const fullName =
      `${employee.first_name || ""} ${
        employee.last_name || ""
      }`.trim();

    return (
      <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        {/* Top accent */}
        <div className="h-1 bg-gradient-to-r from-[#4D44B5] via-[#746BDA] to-[#9B95EA] opacity-70 group-hover:opacity-100 transition-opacity" />

        <div className="p-5">
          {/* Identity */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={
                    employee.profileImage ||
                    employee.profile_picture ||
                    placeholderImage
                  }
                  alt={fullName || "Employee"}
                  className="w-14 h-14 rounded-2xl object-cover border border-gray-100 shadow-sm"
                />

                <span
                  className={`absolute -right-1 -bottom-1 w-4 h-4 rounded-full border-[3px] border-white ${statusStyles.dot}`}
                />
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-[#303972] text-base capitalize truncate">
                  {fullName || "Unnamed Employee"}
                </h3>

                <p className="text-xs text-gray-400 mt-1 truncate">
                  {employee.employee_code ||
                    "No employee code"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() =>
                  navigate("/addEmployee", {
                    state: { employee },
                  })
                }
                className="w-8 h-8 rounded-lg bg-[#F2F0FF] text-[#4D44B5] flex items-center justify-center hover:bg-[#4D44B5] hover:text-white transition-all"
                aria-label="Edit employee"
              >
                <FaEdit size={12} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedEmployee(employee);
                  setShowDeletePopup(true);
                }}
                className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                aria-label="Delete employee"
              >
                <FaTrashAlt size={11} />
              </button>
            </div>
          </div>

          {/* Job information */}
          <div className="mt-5">
            <p className="text-sm font-medium text-gray-700 capitalize truncate">
              {employee.job_title || "Employee"}
            </p>

            <p className="text-xs text-gray-400 mt-1 truncate">
              {employee.email || "No email available"}
            </p>
          </div>

          {/* Details */}
          <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-300">
                Employment
              </p>

              <p className="text-xs font-medium text-gray-600 mt-1 capitalize truncate">
                {employee.employment_type ||
                  "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-300">
                Status
              </p>

              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold mt-1 capitalize ${statusStyles.text}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${statusStyles.dot}`}
                />
                {employee.status || "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //Page

  return (
    <div className="flex-1 min-h-screen bg-[#F7F7FC] px-4 sm:px-7 lg:px-10 py-5 sm:py-7 lg:py-9">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <Navbar title="Employees" />

          <p className="text-sm text-gray-400 mt-1 ml-1">
            Manage your workforce and employee information
          </p>
        </div>

        <ProfileGroup gap="gap-8" />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7">
        {/* Total */}
        <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4D44B5]" />

          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                Total Employees
              </p>

              <p className="text-2xl sm:text-3xl font-bold text-[#303972] mt-2">
                {totalEmployees}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                All employee records
              </p>
            </div>

            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center">
              <FaUsers size={16} />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400" />

          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                Active
              </p>

              <p className="text-2xl sm:text-3xl font-bold text-[#303972] mt-2">
                {activeEmployees}
              </p>

              <p className="text-xs text-emerald-500 mt-1">
                Currently working
              </p>
            </div>

            <div className="w-11 h-11 shrink-0 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <FaUserCheck size={16} />
            </div>
          </div>
        </div>

        {/* Other */}
        <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400" />

          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                Other
              </p>

              <p className="text-2xl sm:text-3xl font-bold text-[#303972] mt-2">
                {otherEmployees}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Inactive or separated
              </p>
            </div>

            <div className="w-11 h-11 shrink-0 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
              <FaUserClock size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mt-7 bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4">
        <div className="flex flex-col gap-3">
          {/* Search */}
          <div className="relative w-full">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm pointer-events-none" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                changeSearch(e.target.value)
              }
              placeholder="Search employees by name, code, job title..."
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#F8F8FC] border border-transparent text-sm text-gray-600 outline-none transition-all focus:bg-white focus:border-[#4D44B5]/30 focus:ring-4 focus:ring-[#4D44B5]/5 placeholder:text-gray-400"
            />
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Employment type */}
            <div className="relative min-w-0">
              <button
                type="button"
                onClick={() =>
                  setFilterOpen(
                    filterOpen === "employment"
                      ? false
                      : "employment"
                  )
                }
                className="h-12 w-full px-4 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 flex items-center justify-between gap-2 hover:border-[#4D44B5]/40 transition-all"
              >
                <span className="truncate">
                  {employmentFilter === "All"
                    ? "Employment Type"
                    : employmentFilter}
                </span>

                <FaChevronDown
                  className={`text-[9px] shrink-0 transition-transform ${
                    filterOpen === "employment"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {filterOpen === "employment" && (
                <div className="absolute left-0 top-[56px] z-40 w-full bg-white rounded-xl border border-gray-100 shadow-xl p-1.5 max-h-60 overflow-y-auto">
                  {employmentTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        changeEmploymentFilter(type)
                      }
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        employmentFilter === type
                          ? "bg-[#F2F0FF] text-[#4D44B5] font-medium"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status */}
            <div className="relative min-w-0">
              <button
                type="button"
                onClick={() =>
                  setFilterOpen(
                    filterOpen === "status"
                      ? false
                      : "status"
                  )
                }
                className="h-12 w-full px-4 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 flex items-center justify-between gap-2 hover:border-[#4D44B5]/40 transition-all"
              >
                <span>{statusFilter}</span>

                <FaChevronDown
                  className={`text-[9px] transition-transform ${
                    filterOpen === "status"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {filterOpen === "status" && (
                <div className="absolute left-0 top-[56px] z-40 w-full bg-white rounded-xl border border-gray-100 shadow-xl p-1.5">
                  {["All", "Active", "Other"].map(
                    (status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() =>
                          changeStatusFilter(status)
                        }
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          statusFilter === status
                            ? "bg-[#F2F0FF] text-[#4D44B5] font-medium"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Add Employee */}
            <div className="min-w-0">
              <Button
                text="Add Employee"
                iconPrefix={<FaPlus size={12} />}
                onClick={() =>
                  navigate("/addEmployee")
                }
                hasBackground={true}
                bgColor="#4D44B5"
                className="h-12 w-full text-white px-5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Directory heading */}
      <div className="mt-7 mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-[#303972]">
            Employee Directory
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            {filteredEmployees.length}{" "}
            {filteredEmployees.length === 1
              ? "employee"
              : "employees"}{" "}
            found
          </p>
        </div>

        {(searchQuery ||
          statusFilter !== "All" ||
          employmentFilter !== "All") && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("All");
              setEmploymentFilter("All");
              setCurrentPage(1);
            }}
            className="text-xs font-medium text-[#4D44B5] hover:underline self-start sm:self-auto"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Employee cards */}
      {paginatedEmployees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginatedEmployees.map((employee) => (
            <EmployeeCard
              key={employee.employee_code}
              employee={employee}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 px-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center">
            <FaSearch size={16} />
          </div>

          <h3 className="text-base font-semibold text-[#303972] mt-4">
            No employees found
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredEmployees.length > 0 && (
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-600">
              {showingFrom}-{showingTo}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-600">
              {filteredEmployees.length}
            </span>{" "}
            employees
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={safeCurrentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    safeCurrentPage - 1
                  )
                }
                className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-400 flex items-center justify-center hover:border-[#4D44B5]/40 hover:text-[#4D44B5] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronLeft size={10} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`w-9 h-9 rounded-lg text-xs font-medium transition-all ${
                    safeCurrentPage === page
                      ? "bg-[#4D44B5] text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-500 hover:border-[#4D44B5]/40 hover:text-[#4D44B5]"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={
                  safeCurrentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    safeCurrentPage + 1
                  )
                }
                className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-400 flex items-center justify-center hover:border-[#4D44B5]/40 hover:text-[#4D44B5] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronRight size={10} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Delete popup */}
      {showDeletePopup && (
        <DeletePopup
          onConfirm={handleDelete}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Employee;