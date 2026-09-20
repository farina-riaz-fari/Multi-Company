import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../../store/EmployeeContext";
import { PartnerContext } from "../../store/PartnerContext";
import TableWithPagination from "../../components/Table";
import DeletePopup from "../../components/DeletePopup/deletepopup";
import placeholderImage from "../../assets/placeholder.png";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import Button from "../../components/Button";
import UserContext from "../../store/UserContext";
import {
  FaEdit,
  FaPlus,
  FaSearch,
  FaTrashAlt,
  FaUser,
  FaUserCheck,
  FaUserClock,
  FaChevronDown,
} from "react-icons/fa";

const User = () => {
  const { users, deleteUser } = useContext(UserContext);
  const { employees, deleteEmployee } = useContext(EmployeeContext);
  const { partners, deletePartner } = useContext(PartnerContext);

  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const navigate = useNavigate();
  const itemsPerPage = 6;

  /* --------------------------------------------------
     Combine users + employees + partners
  -------------------------------------------------- */

  const allUsers = useMemo(() => {
    const userEmployeeCodes = new Set(
      users.map((user) => user.userId)
    );

    const employeeAsUsers = employees
      .filter(
        (emp) => !userEmployeeCodes.has(emp.employee_code)
      )
      .map((emp) => ({
        userId: emp.employee_code,
        firstName: emp.first_name,
        lastName: emp.last_name,
        email: emp.email || "N/A",
        gender: emp.gender || "N/A",
        companyId: emp.company || "N/A",
        employmentType:
          emp.employment_type || "Employee",
        role: emp.role || "Employee",
        status: emp.status || "Active",
        profilePicture:
          emp.profileImage || placeholderImage,
        userType: "Employee",
      }));

    const userPartnerCodes = new Set(
      users.map((user) => user.userId)
    );

    const partnerAsUsers = partners
      .filter(
        (partner) =>
          !userPartnerCodes.has(partner.userId)
      )
      .map((partner) => ({
        userId: partner.userId,
        firstName: partner.firstName,
        lastName: partner.lastName,
        email: partner.email || "N/A",
        gender: partner.gender || "N/A",
        companyId: partner.companyId || "N/A",
        employmentType: "Partner",
        role: partner.role || "Partner",
        status: partner.status || "Active",
        profilePicture:
          partner.profileImage || placeholderImage,
        userType: "Partner",
      }));

    return [
      ...users.map((user) => ({
        ...user,
        profilePicture:
          user.profilePicture ||
          user.profileImage ||
          placeholderImage,
        userType: "User",
      })),
      ...employeeAsUsers,
      ...partnerAsUsers,
    ];
  }, [users, employees, partners]);

  /* --------------------------------------------------
     Status helpers
  -------------------------------------------------- */

  const normalizeStatus = (status = "") => {
    const value = status.toLowerCase();

    if (value === "on duty") return "Active";
    if (value === "resigned") return "Suspended";

    return status || "Unknown";
  };

  const isActive = (status = "") =>
    ["active", "on duty"].includes(
      status.toLowerCase()
    );

  const isSuspended = (status = "") =>
    ["suspended", "resigned"].includes(
      status.toLowerCase()
    );

  const isInactive = (status = "") =>
    ["inactive", "terminated"].includes(
      status.toLowerCase()
    );

  /* --------------------------------------------------
     Statistics
  -------------------------------------------------- */

  const totalUsers = allUsers.length;

  const activeUsers = allUsers.filter((user) =>
    isActive(user.status)
  ).length;

  const inactiveUsers = allUsers.filter(
    (user) =>
      isInactive(user.status) ||
      isSuspended(user.status)
  ).length;

  /* --------------------------------------------------
     Search + filter
  -------------------------------------------------- */

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      const searchableText = `
        ${user.firstName}
        ${user.lastName}
        ${user.userId}
        ${user.email}
        ${user.role}
        ${user.companyId}
      `.toLowerCase();

      const matchesSearch = searchableText.includes(
        search.toLowerCase()
      );

      let matchesFilter = true;

      if (activeFilter === "Active") {
        matchesFilter = isActive(user.status);
      }

      if (activeFilter === "Inactive") {
        matchesFilter =
          isInactive(user.status) ||
          isSuspended(user.status);
      }

      return matchesSearch && matchesFilter;
    });
  }, [allUsers, search, activeFilter]);

  /* --------------------------------------------------
     Edit
  -------------------------------------------------- */

  const handleEdit = (user) => {
    const isUser = users.some(
      (u) => u.userId === user.userId
    );

    const isEmployee = employees.some(
      (employee) =>
        employee.employee_code === user.userId
    );

    const isPartner = partners.some(
      (partner) => partner.userId === user.userId
    );

    if (isUser && !isEmployee && !isPartner) {
      navigate("/add-user", {
        state: { student: user },
      });
    } else if (isEmployee) {
      const completeEmployee = {
        employee_code: user.userId,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        gender: user.gender,
        company: user.companyId,
        employment_type:
          user.employmentType || "",
        job_title: user.role,
        status: user.status,
        address: "",
        national_id: "",
        passport_number: "",
        phone_number: "",
        department_id: "",
        hire_date: new Date().toISOString(),
        termination_date: "",
        salary: "",
        bank_account_number: "",
        bank_name: "",
        tax_identification_number: "",
        is_tax_exempt: "false",
        payment_method: "Bank Transfer",
        profileImage: user.profilePicture,
        ...employees.find(
          (employee) =>
            employee.employee_code === user.userId
        ),
      };

      navigate("/addEmployee", {
        state: {
          employee: completeEmployee,
          returnPath: "/users",
        },
      });
    } else if (isPartner) {
      const matchedPartner = partners.find(
        (partner) =>
          partner.userId === user.userId
      );

      const completePartner = {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        companyId: user.companyId || "",
        role: user.role || "",
        name: user.name || "",
        address: user.address || "",
        country: user.country || "",
        city: user.city || "",
        zipCode: user.zipCode || "",
        taxId: user.taxId || "",
        isVerified: user.isVerified ?? true,
        agreementSigned:
          user.agreementSigned ?? true,
        agreementDocument:
          user.agreementDocument || "",
        status: user.status || "Active",
        createdAt:
          user.createdAt ||
          new Date().toISOString(),
        updatedAt: user.updatedAt || "",
        ...matchedPartner,
      };

      navigate("/add-partner", {
        state: {
          partner: completePartner,
          returnPath: "/users",
        },
      });
    } else {
      navigate("/add-user", {
        state: { student: user },
      });
    }
  };

  /* --------------------------------------------------
     Delete
  -------------------------------------------------- */

  const handleConfirmDelete = () => {
    selectedItems.forEach((id) => {
      deleteUser(id);
      deleteEmployee(id);
      deletePartner(id);
    });

    setSelectedItems([]);
    setShowDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  /* --------------------------------------------------
     User row
  -------------------------------------------------- */

  const UserRow = ({ user }) => {
    const status = normalizeStatus(user.status);
    const active = isActive(user.status);
    const suspended = isSuspended(user.status);

    return (
      <div className="group border-b border-gray-100 last:border-0 px-4 sm:px-6 py-4 sm:py-5 transition-all duration-200 hover:bg-[#FBFAFF]">
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(260px,2.2fr)_1.15fr_1fr_110px] lg:items-center gap-4 lg:gap-6">

          {/* User identity */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative shrink-0">
              <img
                src={
                  user.profilePicture ||
                  placeholderImage
                }
                alt={`${user.firstName} ${user.lastName}`}
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl object-cover border border-gray-100 shadow-sm"
              />

              <span
                className={`absolute right-0 bottom-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                  active
                    ? "bg-emerald-400"
                    : "bg-gray-300"
                }`}
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <h3 className="font-semibold text-[#303972] truncate capitalize">
                  {user.firstName} {user.lastName}
                </h3>

                {user.userType !== "User" && (
                  <span className="hidden sm:inline-flex shrink-0 px-2 py-0.5 rounded-md bg-gray-100 text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                    {user.userType}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-1 truncate">
                {user.email}
              </p>

              <p className="text-[10px] text-gray-300 mt-0.5">
                ID: {user.userId}
              </p>
            </div>
          </div>

          {/* Company */}
          <div className="flex items-center justify-between lg:block pl-[68px] lg:pl-0">
            <span className="text-[10px] uppercase tracking-wider text-gray-300 lg:hidden">
              Company
            </span>

            <p className="text-sm font-medium text-gray-600 truncate max-w-[180px]">
              {user.companyId || "N/A"}
            </p>
          </div>

          {/* Role */}
          <div className="flex items-center justify-between lg:block pl-[68px] lg:pl-0">
            <span className="text-[10px] uppercase tracking-wider text-gray-300 lg:hidden">
              Role
            </span>

            <span className="inline-flex items-center text-sm font-medium text-[#4D44B5]">
              {user.role || "User"}
            </span>
          </div>

          {/* Status + actions */}
          <div className="flex items-center justify-between pl-[68px] lg:pl-0">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-300 lg:hidden block mb-1">
                Status
              </span>

              <span
                className={`inline-flex items-center gap-2 text-xs font-semibold ${
                  active
                    ? "text-emerald-600"
                    : suspended
                    ? "text-orange-500"
                    : "text-gray-400"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    active
                      ? "bg-emerald-400"
                      : suspended
                      ? "bg-orange-400"
                      : "bg-gray-300"
                  }`}
                />

                {status}
              </span>
            </div>

            <div className="flex items-center gap-2 lg:ml-4">
              <button
                type="button"
                onClick={() => handleEdit(user)}
                className="w-9 h-9 rounded-xl bg-[#F2F0FF] text-[#4D44B5] flex items-center justify-center transition-all duration-200 hover:bg-[#4D44B5] hover:text-white hover:-translate-y-0.5"
                aria-label="Edit user"
              >
                <FaEdit size={13} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedItems([user.userId]);
                  setShowDeletePopup(true);
                }}
                className="w-9 h-9 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center transition-all duration-200 hover:bg-red-50 hover:text-red-500 hover:-translate-y-0.5"
                aria-label="Delete user"
              >
                <FaTrashAlt size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* --------------------------------------------------
     Main
  -------------------------------------------------- */

  return (
    <div className="flex-1 min-h-screen bg-[#F7F7FC] px-4 sm:px-7 lg:px-10 py-5 sm:py-7 lg:py-9">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <Navbar title="Users" />

          <p className="text-sm text-gray-400 mt-1 ml-1">
            Manage accounts, roles and access
          </p>
        </div>

        <ProfileGroup gap="gap-8" />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7">

        {/* Total */}
        <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-[#F1EFFF]" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                Total Users
              </p>

              <p className="text-2xl sm:text-3xl font-bold text-[#303972] mt-2">
                {totalUsers}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Registered accounts
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center">
              <FaUser size={16} />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-emerald-50" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                Active
              </p>

              <p className="text-2xl sm:text-3xl font-bold text-[#303972] mt-2">
                {activeUsers}
              </p>

              <p className="text-xs text-emerald-500 mt-1">
                Active accounts
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <FaUserCheck size={16} />
            </div>
          </div>
        </div>

        {/* Inactive */}
        <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-orange-50" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                Inactive
              </p>

              <p className="text-2xl sm:text-3xl font-bold text-[#303972] mt-2">
                {inactiveUsers}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Suspended or inactive
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
              <FaUserClock size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Search + actions */}
      <div className="mt-7 bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">

          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm pointer-events-none" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search users by name, email, ID or role..."
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#F8F8FC] border border-transparent text-sm text-gray-600 outline-none transition-all duration-200 focus:bg-white focus:border-[#4D44B5]/30 focus:ring-4 focus:ring-[#4D44B5]/5 placeholder:text-gray-400"
            />
          </div>

          {/* Filter */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() =>
                setFilterOpen(!filterOpen)
              }
              className="h-12 w-full sm:w-[120px] px-4 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 flex items-center justify-between gap-2 hover:border-[#4D44B5]/40 transition-all"
            >
              <span>{activeFilter}</span>

              <FaChevronDown
                className={`text-[10px] transition-transform ${
                  filterOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {filterOpen && (
              <div className="absolute right-0 top-[56px] z-40 w-[150px] bg-white rounded-xl border border-gray-100 shadow-xl p-1.5">
                {[
                  "All",
                  "Active",
                  "Inactive",
                ].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => {
                      setActiveFilter(filter);
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      activeFilter === filter
                        ? "bg-[#F2F0FF] text-[#4D44B5] font-medium"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add User */}
          <Button
            text="Add User"
            iconPrefix={<FaPlus size={12} />}
            onClick={() =>
              navigate("/add-user")
            }
            hasBackground={true}
            bgColor="#4D44B5"
            className="h-12 w-full sm:w-auto text-white px-5 shrink-0"
          />
        </div>
      </div>

      {/* User list */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* List header */}
        <div className="px-5 sm:px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-[#303972]">
              User Accounts
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              {filteredUsers.length}{" "}
              {filteredUsers.length === 1
                ? "account"
                : "accounts"}{" "}
              found
            </p>
          </div>

          {activeFilter !== "All" && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">
                Filtered by
              </span>

              <span className="px-2.5 py-1 rounded-lg bg-[#F2F0FF] text-[#4D44B5] font-medium">
                {activeFilter}
              </span>
            </div>
          )}
        </div>

        {/* Column labels */}
        <div className="hidden lg:grid grid-cols-[minmax(260px,2.2fr)_1.15fr_1fr_110px] gap-6 px-6 py-3 bg-[#FBFBFD] border-b border-gray-100">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-300">
            User
          </span>

          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-300">
            Company
          </span>

          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-300">
            Role
          </span>

          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-300">
            Status
          </span>
        </div>

        {/* User list */}
        {filteredUsers.length > 0 ? (
          <div>
            {filteredUsers.map((user) => (
              <UserRow
                key={user.userId}
                user={user}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 px-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F2F0FF] text-[#4D44B5] flex items-center justify-center">
              <FaSearch size={16} />
            </div>

            <h3 className="text-base font-semibold text-[#303972] mt-4">
              No users found
            </h3>

            <p className="text-sm text-gray-400 mt-1 max-w-sm mx-auto">
              No accounts match your current search or filter.
            </p>

            {(search || activeFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
                className="mt-4 text-sm font-medium text-[#4D44B5] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredUsers.length > itemsPerPage && (
          <div className="border-t border-gray-100">
            <TableWithPagination
              columns={[]}
              data={filteredUsers}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}

        {filteredUsers.length > 0 && (
          <div className="px-5 sm:px-6 py-3 bg-[#FBFBFD] border-t border-gray-100">
            <p className="text-[11px] text-gray-400">
              Showing {Math.min(
                filteredUsers.length,
                itemsPerPage
              )} of {filteredUsers.length} accounts
            </p>
          </div>
        )}
      </div>

      {/* Delete popup */}
      {showDeletePopup && (
        <DeletePopup
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default User;
