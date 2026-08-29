import React, { useContext, useMemo, useState } from "react";
import { EmployeeContext } from "../../store/EmployeeContext";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import Searchbar from "../../components/Searchbar";

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

  const filteredEmployees = payrollData.filter((employee) => {
    const name = `${employee.firstName || ""} ${
      employee.lastName || ""
    }`.toLowerCase();

    const matchesSearch = name.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || employee.payrollStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

  return (
    <div className="p-4 sm:p-10 flex-1 min-h-screen bg-[#F3F4FF]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Navbar title="Payroll" />
        <ProfileGroup gap="gap-10" />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-400 font-medium">Total Employees</p>
          <h2 className="text-3xl font-bold text-[#303972] mt-2">
            {payrollData.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-400 font-medium">Total Payroll</p>
          <h2 className="text-3xl font-bold text-[#303972] mt-2">
            {totalPayroll.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-400 font-medium">Paid</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {paidEmployees}
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-400 font-medium">Pending</p>
          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {pendingEmployees}
          </h2>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-xl shadow-sm mt-8 p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#303972]">
            Payroll Records
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <Searchbar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none w-full sm:w-[170px] h-[46px] bg-white border border-[#D9D7EF] rounded-full px-5 pr-10 text-[#303972] font-medium outline-none focus:border-[#4D44B5] cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>

              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#4D44B5]">
                ▼
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="py-4 px-4 text-gray-400 font-medium">
                  Employee
                </th>
                <th className="py-4 px-4 text-gray-400 font-medium">
                  Company
                </th>
                <th className="py-4 px-4 text-gray-400 font-medium">
                  Salary
                </th>
                <th className="py-4 px-4 text-gray-400 font-medium">
                  Payment Method
                </th>
                <th className="py-4 px-4 text-gray-400 font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr
                    key={employee.employee_code}
                    className="border-b border-gray-100"
                  >
                    <td className="py-5 px-4 font-bold text-[#303972]">
                      {employee.firstName} {employee.lastName}
                    </td>

                    <td className="py-5 px-4 text-gray-500">
                      {employee.company || "N/A"}
                    </td>

                    <td className="py-5 px-4 font-semibold text-[#303972]">
                      {Number(employee.salary || 0).toLocaleString()}
                    </td>

                    <td className="py-5 px-4 text-gray-500">
                      {employee.payment_method || "N/A"}
                    </td>

                    <td className="py-5 px-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          employee.payrollStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {employee.payrollStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-12 text-gray-400"
                  >
                    No payroll records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payroll;