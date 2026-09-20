import React, { useContext, useMemo, useState } from "react";
import {
  FaBuilding,
  FaEdit,
  FaGlobe,
  FaPlus,
  FaSortDown,
  FaTrashAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import Searchbar from "../../components/Searchbar";
import { CompanyContext } from "../../store/CompanyContext";
import Button from "../../components/Button";
import TableWithPagination from "../../components/Table";
import DeletePopup from "../../components/DeletePopup/deletepopup";

const Company = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const navigate = useNavigate();

  const { companies = [], deleteCompany } = useContext(CompanyContext);

  // --------------------------------------------------
  // Company statistics
  // --------------------------------------------------

  const totalCompanies = companies.length;

  const activeCompanies = companies.filter(
    (company) => company.status?.toLowerCase() === "active"
  ).length;

  const suspendedCompanies = companies.filter(
    (company) => company.status?.toLowerCase() === "suspended"
  ).length;

  const totalCountries = new Set(
    companies
      .map((company) => company.country)
      .filter(Boolean)
      .map((country) => country.toLowerCase())
  ).size;

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  const filteredCompanies = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return companies;

    return companies.filter((company) =>
      [
        company.companyName,
        company.email,
        company.country,
        company.owner,
        company.currency,
        company.status,
      ].some((field) => field?.toLowerCase().includes(query))
    );
  }, [companies, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // --------------------------------------------------
  // Status
  // --------------------------------------------------

  const getStatusClass = (status) => {
    const normalized = status?.toLowerCase();

    if (normalized === "active") {
      return "bg-green-100 text-green-700";
    }

    if (normalized === "suspended") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-600";
  };

  // --------------------------------------------------
  // Delete
  // --------------------------------------------------

  const handleDelete = () => {
    if (selectedCompany) {
      deleteCompany(selectedCompany.email);
    }

    setShowDeletePopup(false);
    setSelectedCompany(null);
  };

  const handleCancel = () => {
    setShowDeletePopup(false);
    setSelectedCompany(null);
  };

  // --------------------------------------------------
  // Table columns
  // --------------------------------------------------

  const columns = [
    {
      key: "companyName",
      label: "Company Name",
      render: (company) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F0EEFF] flex items-center justify-center shrink-0">
            <FaBuilding className="text-[#4D44B5] text-[17px]" />
          </div>

          <span className="font-bold text-[#303972] capitalize text-left">
            {company.companyName}
          </span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (company) => (
        <span className="break-all text-gray-500">{company.email}</span>
      ),
    },
    {
      key: "currency",
      label: "Currency",
      render: (company) => (
        <span className="font-medium text-[#303972]">
          {company.currency}
        </span>
      ),
    },
    {
      key: "country",
      label: "Country",
      render: (company) => (
        <span className="text-gray-500">{company.country}</span>
      ),
    },
    {
      key: "owner",
      label: "Owner",
      render: (company) => (
        <span className="text-gray-500">{company.owner}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (company) => (
        <span
          className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusClass(
            company.status
          )}`}
        >
          {company.status}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (company) => (
        <div className="flex justify-center gap-3">
          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-[#4D44B51A] flex items-center justify-center transition hover:bg-[#4D44B533]"
            onClick={() => navigate("/addCompany", { state: { company } })}
            title="Edit company"
          >
            <FaEdit className="text-[#4D44B5] text-[17px]" />
          </button>

          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-[#4D44B51A] flex items-center justify-center transition hover:bg-[#4D44B533]"
            onClick={() => {
              setSelectedCompany(company);
              setShowDeletePopup(true);
            }}
            title="Delete company"
          >
            <FaTrashAlt className="text-[#4D44B5] text-[17px]" />
          </button>
        </div>
      ),
    },
  ];

  // --------------------------------------------------
  // Summary cards
  // --------------------------------------------------

  const summaryCards = [
    {
      title: "Total Companies",
      value: totalCompanies,
      icon: <FaBuilding />,
      iconBg: "bg-[#EAE8FF]",
      iconColor: "text-[#4D44B5]",
    },
    {
      title: "Active",
      value: activeCompanies,
      icon: <FaBuilding />,
      iconBg: "bg-[#EAF8EF]",
      iconColor: "text-green-600",
    },
    {
      title: "Suspended",
      value: suspendedCompanies,
      icon: <FaBuilding />,
      iconBg: "bg-[#FFF0ED]",
      iconColor: "text-[#FB7D5B]",
    },
    {
      title: "Countries",
      value: totalCountries,
      icon: <FaGlobe />,
      iconBg: "bg-[#FFF8DF]",
      iconColor: "text-[#D99A00]",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-1 bg-[#F3F4FF] p-4 sm:p-6 lg:p-8 2xl:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 lg:mt-0">
          <Navbar title="Company" />
          <ProfileGroup gap="gap-10" />
        </div>

        {/* Company Introduction */}
        <div className="mt-8 bg-gradient-to-r from-[#4D44B5] to-[#6258CC] rounded-2xl p-6 sm:p-8 text-white shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                  <FaBuilding className="text-xl" />
                </div>

                <span className="text-sm font-medium text-white/75 uppercase tracking-wider">
                  Company Management
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold">
                Manage your companies
              </h1>

              <p className="mt-2 text-sm sm:text-base text-white/75 max-w-2xl">
                Keep your company information organized, monitor status, and
                manage company details from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/addCompany")}
              className="flex items-center justify-center gap-2 bg-white text-[#4D44B5] font-semibold px-5 py-3 rounded-xl shadow-sm transition hover:bg-gray-100 whitespace-nowrap"
            >
              <FaPlus />
              Add Company
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
          {summaryCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center text-lg shrink-0`}
              >
                {card.icon}
              </div>

              <div>
                <p className="text-sm text-gray-400 font-medium">
                  {card.title}
                </p>

                <p className="text-2xl font-bold text-[#303972] mt-1">
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Company Directory */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Directory Header */}
          <div className="p-5 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#303972]">
                  Company Directory
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  View and manage all registered companies.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <div className="w-full sm:w-[320px] lg:w-[360px]">
                  <Searchbar
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>

                <div className="w-full sm:w-[130px] shrink-0">
                  <Button
                    text="Newest"
                    iconPostfix={
                      <FaSortDown className="text-[16px] mb-[6px]" />
                    }
                    hasBorder={true}
                    borderColor="#4D44B5"
                    className="w-full justify-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Search Result Info */}
          {searchQuery && (
            <div className="px-5 sm:px-6 py-3 bg-[#F8F8FF] border-b border-gray-100">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-[#303972]">
                  {filteredCompanies.length}
                </span>{" "}
                result
                {filteredCompanies.length !== 1 ? "s" : ""} for{" "}
                <span className="font-semibold text-[#4D44B5]">
                  "{searchQuery}"
                </span>
              </p>
            </div>
          )}

          {/* Table */}
          <div className="p-4 sm:p-6 overflow-x-auto">
            {filteredCompanies.length > 0 ? (
              <TableWithPagination
                columns={columns}
                data={filteredCompanies}
                itemsPerPage={8}
              />
            ) : (
              <div className="min-h-[280px] flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-[#F0EEFF] flex items-center justify-center mb-4">
                  <FaBuilding className="text-2xl text-[#4D44B5]" />
                </div>

                <h3 className="text-lg font-bold text-[#303972]">
                  No companies found
                </h3>

                <p className="text-sm text-gray-400 mt-2 max-w-md">
                  {searchQuery
                    ? "Try adjusting your search to find a company."
                    : "You have not added any companies yet. Add your first company to get started."}
                </p>

                {!searchQuery && (
                  <button
                    type="button"
                    onClick={() => navigate("/addCompany")}
                    className="mt-5 flex items-center gap-2 bg-[#4D44B5] text-white font-semibold px-5 py-3 rounded-xl transition hover:bg-[#40389C]"
                  >
                    <FaPlus />
                    Add Company
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Popup */}
      {showDeletePopup && (
        <DeletePopup onConfirm={handleDelete} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default Company;