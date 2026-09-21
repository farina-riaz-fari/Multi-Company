import React, { useContext, useMemo, useState } from "react";
import {
  FaMoneyBillWave,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaChevronDown,
  FaArrowUp,
  FaArrowDown,
  FaCreditCard,
  FaBuilding,
} from "react-icons/fa";
import { EmployeeContext } from "../../store/EmployeeContext";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";

const Payroll = () => {
  const { employees } = useContext(EmployeeContext);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const payrollData = useMemo(() => {
    return (employees || []).map((employee, index) => ({
      ...employee,
      payrollStatus: index % 2 === 0 ? "Paid" : "Pending",
    }));
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const query = search.toLowerCase().trim();

    return payrollData.filter((employee) => {
      const name = `${employee.firstName || ""} ${
        employee.lastName || ""
      }`.toLowerCase();

      const company = (employee.company || "").toLowerCase();

      const matchesSearch =
        name.includes(query) || company.includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        employee.payrollStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payrollData, search, statusFilter]);

  const totalPayroll = payrollData.reduce(
    (total, employee) => total + Number(employee.salary || 0),
    0
  );

  const paidEmployees = payrollData.filter(
    (employee) => employee.payrollStatus === "Paid"
  ).length;

  const pendingEmployees = payrollData.filter(
    (employee) => employee.payrollStatus === "Pending"
  ).length;

  const paidAmount = payrollData
    .filter((employee) => employee.payrollStatus === "Paid")
    .reduce(
      (total, employee) => total + Number(employee.salary || 0),
      0
    );

  const pendingAmount = payrollData
    .filter((employee) => employee.payrollStatus === "Pending")
    .reduce(
      (total, employee) => total + Number(employee.salary || 0),
      0
    );

  const paidPercentage =
    totalPayroll > 0
      ? Math.round((paidAmount / totalPayroll) * 100)
      : 0;

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString();
  };

  const getInitials = (employee) => {
    const first =
      employee.firstName?.charAt(0)?.toUpperCase() || "";

    const last =
      employee.lastName?.charAt(0)?.toUpperCase() || "";

    return `${first}${last}` || "E";
  };

  return (
    <div className="flex-1 min-h-screen bg-[#F7F7FC] px-4 sm:px-6 lg:px-10 py-5 sm:py-7 lg:py-9">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <Navbar title="Payroll" />

          <p className="text-sm text-gray-400 mt-1 ml-1">
            Track employee salaries and payment status
          </p>
        </div>

        <ProfileGroup gap="gap-8" />
      </div>

      {/* Payroll Overview */}
      <div className="mt-7 grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-5">
        {/* Main Summary */}
        <div className="relative overflow-hidden bg-[#303972] rounded-2xl p-6 sm:p-7 text-white shadow-sm">
          <div className="absolute -right-16 -top-20 w-52 h-52 rounded-full bg-[#746BDA]/20" />
          <div className="absolute -right-5 -bottom-24 w-40 h-40 rounded-full bg-[#9B95EA]/10" />

          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                    <FaMoneyBillWave size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-white/50">
                      Payroll Overview
                    </p>

                    <h2 className="text-xl font-semibold mt-0.5">
                      Current Payroll
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-white/50 mt-6">
                  Total salary amount across all employees
                </p>

                <p className="text-3xl sm:text-4xl font-bold mt-1">
                  {formatAmount(totalPayroll)}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-white/50">
                  Employees
                </p>

                <p className="text-2xl font-bold mt-1">
                  {payrollData.length}
                </p>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-white/10">
              <div className="flex items-center justify-between gap-4 mb-2">
                <p className="text-xs text-white/60">
                  Payroll processed
                </p>

                <p className="text-xs font-semibold">
                  {paidPercentage}%
                </p>
              </div>

              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-all"
                  style={{
                    width: `${paidPercentage}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                Payment Breakdown
              </p>

              <h2 className="text-lg font-semibold text-[#303972] mt-1">
                Payroll Status
              </h2>
            </div>

            <div className="w-10 h-10 rounded-xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center">
              <FaCreditCard size={15} />
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {/* Paid */}
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                    <FaCheckCircle size={14} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#303972]">
                      Paid
                    </p>

                    <p className="text-[11px] text-gray-400">
                      {paidEmployees} employees
                    </p>
                  </div>
                </div>

                <p className="text-sm font-bold text-emerald-500">
                  {formatAmount(paidAmount)}
                </p>
              </div>
            </div>

            {/* Pending */}
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                    <FaClock size={14} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#303972]">
                      Pending
                    </p>

                    <p className="text-[11px] text-gray-400">
                      {pendingEmployees} employees
                    </p>
                  </div>
                </div>

                <p className="text-sm font-bold text-orange-500">
                  {formatAmount(pendingAmount)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                Paid Rate
              </p>

              <div className="flex items-center gap-2 mt-1">
                <FaArrowUp className="text-emerald-500 text-[10px]" />

                <p className="text-lg font-bold text-[#303972]">
                  {paidPercentage}%
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                Pending Rate
              </p>

              <div className="flex items-center gap-2 mt-1">
                <FaArrowDown className="text-orange-400 text-[10px]" />

                <p className="text-lg font-bold text-[#303972]">
                  {100 - paidPercentage}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Records Header */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
            Salary Management
          </p>

          <h2 className="text-xl font-semibold text-[#303972] mt-1">
            Payroll Records
          </h2>
        </div>

        <p className="text-xs text-gray-400">
          {filteredEmployees.length}{" "}
          {filteredEmployees.length === 1
            ? "record"
            : "records"}
        </p>
      </div>

      {/* Filters */}
      <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm pointer-events-none" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employee or company..."
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#F8F8FC] border border-transparent text-sm text-gray-600 outline-none transition-all focus:bg-white focus:border-[#4D44B5]/30 focus:ring-4 focus:ring-[#4D44B5]/5 placeholder:text-gray-400"
            />
          </div>

          {/* Status Filter */}
          <div className="relative sm:w-[190px]">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none w-full h-12 bg-white border border-gray-200 rounded-xl px-4 pr-10 text-sm text-gray-600 font-medium outline-none focus:border-[#4D44B5]/40 focus:ring-4 focus:ring-[#4D44B5]/5 cursor-pointer transition-all"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>

            <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]" />
          </div>
        </div>
      </div>

      {/* Payroll Records */}
      <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden lg:grid grid-cols-[1.5fr_1fr_1fr_1fr_130px] gap-4 px-6 py-3 bg-[#FAFAFD] border-b border-gray-100">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
            Employee
          </p>

          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
            Company
          </p>

          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
            Salary
          </p>

          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
            Payment Method
          </p>

          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
            Status
          </p>
        </div>

        {filteredEmployees.length > 0 ? (
          <div>
            {filteredEmployees.map((employee, index) => (
              <div
                key={employee.employee_code}
                className={`px-4 sm:px-6 py-5 hover:bg-[#FBFBFE] transition-colors ${
                  index !== filteredEmployees.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                {/* Desktop */}
                <div className="hidden lg:grid grid-cols-[1.5fr_1fr_1fr_1fr_130px] gap-4 items-center">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center font-semibold text-xs shrink-0">
                      {getInitials(employee)}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#303972] capitalize truncate">
                        {employee.firstName} {employee.lastName}
                      </p>

                      <p className="text-[11px] text-gray-400 mt-1 truncate">
                        {employee.employee_code || "Employee"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 min-w-0">
                    <FaBuilding className="text-[#746BDA] text-[11px] shrink-0" />

                    <p className="text-xs text-gray-500 truncate">
                      {employee.company || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#303972]">
                      {formatAmount(employee.salary)}
                    </p>

                    <p className="text-[10px] text-gray-400 mt-1">
                      Monthly salary
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaCreditCard className="text-gray-300 text-[11px]" />

                    <p className="text-xs text-gray-500">
                      {employee.payment_method || "N/A"}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold ${
                        employee.payrollStatus === "Paid"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-orange-50 text-orange-500"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          employee.payrollStatus === "Paid"
                            ? "bg-emerald-400"
                            : "bg-orange-400"
                        }`}
                      />

                      {employee.payrollStatus}
                    </span>
                  </div>
                </div>

                {/* Tablet / Mobile */}
                <div className="lg:hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center font-semibold text-xs shrink-0">
                        {getInitials(employee)}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#303972] capitalize truncate">
                          {employee.firstName} {employee.lastName}
                        </p>

                        <p className="text-[11px] text-gray-400 mt-1 truncate">
                          {employee.company || "No company"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold shrink-0 ${
                        employee.payrollStatus === "Paid"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-orange-50 text-orange-500"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          employee.payrollStatus === "Paid"
                            ? "bg-emerald-400"
                            : "bg-orange-400"
                        }`}
                      />

                      {employee.payrollStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-300">
                        Salary
                      </p>

                      <p className="text-sm font-semibold text-[#303972] mt-1">
                        {formatAmount(employee.salary)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-300">
                        Payment
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {employee.payment_method || "N/A"}
                      </p>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-300">
                        Employee Code
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {employee.employee_code || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 px-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center">
              <FaSearch size={16} />
            </div>

            <h3 className="text-base font-semibold text-[#303972] mt-4">
              No payroll records found
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              Try changing your search or payment status filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payroll;