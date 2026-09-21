import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PartnerContext } from "../../store/PartnerContext";
import {
  FaEdit,
  FaPlus,
  FaTrashAlt,
  FaSearch,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaBuilding,
  FaEllipsisH,
} from "react-icons/fa";
import DeletePopup from "../../components/DeletePopup/deletepopup";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";

const Partner = () => {
  const { partners, deletePartner } =
    useContext(PartnerContext);

  const [search, setSearch] = useState("");
  const [showDeletePopup, setShowDeletePopup] =
    useState(false);
  const [selectedUserId, setSelectedUserId] =
    useState(null);
  const [verificationFilter, setVerificationFilter] =
    useState("All");
  const [filterOpen, setFilterOpen] =
    useState(false);
  const [actionOpen, setActionOpen] =
    useState(null);
  const [currentPage, setCurrentPage] =
    useState(1);

  const navigate = useNavigate();

  const itemsPerPage = 7;

  {/* Statistics */}

  const totalPartners = partners.length;

  const verifiedPartners = partners.filter(
    (partner) => partner.isVerified
  ).length;

  const pendingPartners = partners.filter(
    (partner) => !partner.isVerified
  ).length;

  {/* Search + filter */}

  const filteredPartners = useMemo(() => {
    const query = search
      .toLowerCase()
      .trim();

    return partners.filter((partner) => {
      const searchableText = `
        ${partner.firstName || ""}
        ${partner.lastName || ""}
        ${partner.address || ""}
        ${partner.city || ""}
        ${partner.country || ""}
        ${partner.zipCode || ""}
        ${partner.taxId || ""}
        ${partner.email || ""}
        ${partner.companyName || ""}
      `.toLowerCase();

      const matchesSearch =
        searchableText.includes(query);

      const matchesVerification =
        verificationFilter === "All" ||
        (verificationFilter === "Verified" &&
          partner.isVerified) ||
        (verificationFilter === "Pending" &&
          !partner.isVerified);

      return (
        matchesSearch &&
        matchesVerification
      );
    });
  }, [
    partners,
    search,
    verificationFilter,
  ]);

  {/* Pagination */}

  const totalPages = Math.ceil(
    filteredPartners.length / itemsPerPage
  );

  const safeCurrentPage =
    totalPages > 0
      ? Math.min(currentPage, totalPages)
      : 1;

  const startIndex =
    (safeCurrentPage - 1) *
    itemsPerPage;

  const paginatedPartners =
    filteredPartners.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  const showingFrom =
    filteredPartners.length === 0
      ? 0
      : startIndex + 1;

  const showingTo = Math.min(
    startIndex + itemsPerPage,
    filteredPartners.length
  );

  {/* Handlers */}

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleVerificationFilter = (
    value
  ) => {
    setVerificationFilter(value);
    setCurrentPage(1);
    setFilterOpen(false);
  };

  const handleEdit = (partner) => {
    navigate("/add-partner", {
      state: { partner },
    });

    setActionOpen(null);
  };

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setShowDeletePopup(true);
    setActionOpen(null);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      deletePartner(selectedUserId);
    }

    setShowDeletePopup(false);
    setSelectedUserId(null);

    if (
      paginatedPartners.length === 1 &&
      safeCurrentPage > 1
    ) {
      setCurrentPage(
        safeCurrentPage - 1
      );
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setSelectedUserId(null);
  };

  {/* Partner initials */}

  const getInitials = (partner) => {
    const first =
      partner.firstName
        ?.charAt(0)
        ?.toUpperCase() || "";

    const last =
      partner.lastName
        ?.charAt(0)
        ?.toUpperCase() || "";

    return `${first}${last}` || "P";
  };

  return (
    <div className="flex-1 min-h-screen bg-[#F7F7FC] px-4 sm:px-7 lg:px-10 py-5 sm:py-7 lg:py-9">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <Navbar title="Partners" />

          <p className="text-sm text-gray-400 mt-1 ml-1">
            Manage your business relationships and partners
          </p>
        </div>

        <ProfileGroup gap="gap-8" />
      </div>

      {/* Overview */}

      <div className="mt-7 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center">
                  <FaBuilding size={17} />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                    Business Network
                  </p>

                  <h2 className="text-xl font-semibold text-[#303972] mt-0.5">
                    Partner Overview
                  </h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 lg:w-[430px]">
              <div className="px-4 border-r border-gray-100">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                  Total
                </p>

                <p className="text-2xl font-bold text-[#303972] mt-1">
                  {totalPartners}
                </p>
              </div>

              <div className="px-4 border-r border-gray-100">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                  Verified
                </p>

                <p className="text-2xl font-bold text-emerald-500 mt-1">
                  {verifiedPartners}
                </p>
              </div>

              <div className="px-4">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                  Pending
                </p>

                <p className="text-2xl font-bold text-orange-400 mt-1">
                  {pendingPartners}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-[#4D44B5] via-[#746BDA] to-[#9B95EA]" />
      </div>

      {/* Toolbar */}

      <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4">
        <div className="flex flex-col gap-3">
          {/* Search */}
          <div className="relative w-full">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm pointer-events-none" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                handleSearch(
                  e.target.value
                )
              }
              placeholder="Search partners by name, location, tax ID..."
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#F8F8FC] border border-transparent text-sm text-gray-600 outline-none transition-all focus:bg-white focus:border-[#4D44B5]/30 focus:ring-4 focus:ring-[#4D44B5]/5 placeholder:text-gray-400"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Verification filter */}
            <div className="relative sm:w-[190px]">
              <button
                type="button"
                onClick={() =>
                  setFilterOpen(
                    !filterOpen
                  )
                }
                className="h-12 w-full px-4 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 flex items-center justify-between gap-2 hover:border-[#4D44B5]/40 transition-all"
              >
                <span>
                  {verificationFilter ===
                  "All"
                    ? "Verification Status"
                    : verificationFilter}
                </span>

                <FaChevronDown
                  className={`text-[9px] transition-transform ${
                    filterOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {filterOpen && (
                <div className="absolute left-0 top-[56px] z-40 w-full bg-white rounded-xl border border-gray-100 shadow-xl p-1.5">
                  {[
                    "All",
                    "Verified",
                    "Pending",
                  ].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        handleVerificationFilter(
                          status
                        )
                      }
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        verificationFilter ===
                        status
                          ? "bg-[#F2F0FF] text-[#4D44B5] font-medium"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Add Partner */}
            <div className="sm:ml-auto">
              <Button
                text="Add Partner"
                iconPrefix={
                  <FaPlus size={12} />
                }
                onClick={() =>
                  navigate("/add-partner")
                }
                hasBackground={true}
                bgColor="#4D44B5"
                className="h-12 w-full sm:w-auto text-white px-6"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Partner list header */}

      <div className="mt-7 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
            Partner Directory
          </p>

          <h2 className="text-xl font-semibold text-[#303972] mt-1">
            Business Relationships
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {(search ||
            verificationFilter !==
              "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setVerificationFilter(
                  "All"
                );
                setCurrentPage(1);
              }}
              className="text-xs font-medium text-[#4D44B5] hover:underline"
            >
              Clear filters
            </button>
          )}

          <p className="text-xs text-gray-400">
            {filteredPartners.length}{" "}
            {filteredPartners.length === 1
              ? "partner"
              : "partners"}
          </p>
        </div>
      </div>

      {/* Partner list */}

      <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-visible">
        {/* Desktop column header */}
        <div className="hidden lg:grid grid-cols-[minmax(240px,1.5fr)_minmax(180px,1fr)_minmax(130px,0.8fr)_130px_70px] items-center gap-4 px-6 py-3 bg-[#FAFAFD] border-b border-gray-100 rounded-t-2xl">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
            Partner
          </p>

          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
            Location
          </p>

          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
            Tax ID
          </p>

          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
            Status
          </p>

          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 text-right">
            Action
          </p>
        </div>

        {/* Rows */}
        {paginatedPartners.length > 0 ? (
          <div>
            {paginatedPartners.map(
              (partner, index) => {
                const fullName =
                  `${partner.firstName || ""} ${
                    partner.lastName || ""
                  }`.trim();

                return (
                  <div
                    key={
                      partner.userId
                    }
                    className={`relative px-4 sm:px-6 py-5 hover:bg-[#FBFBFE] transition-colors ${
                      index !==
                      paginatedPartners.length -
                        1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    {/* Desktop */}
                    <div className="hidden lg:grid grid-cols-[minmax(240px,1.5fr)_minmax(180px,1fr)_minmax(130px,0.8fr)_130px_70px] items-center gap-4">
                      {/* Partner */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center font-semibold text-sm shrink-0">
                          {getInitials(
                            partner
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#303972] capitalize truncate">
                            {fullName ||
                              "Unnamed Partner"}
                          </p>

                          <p className="text-xs text-gray-400 mt-1 truncate">
                            Business Partner
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="min-w-0">
                        <div className="flex items-start gap-2">
                          <FaMapMarkerAlt className="text-[#746BDA] text-[11px] mt-1 shrink-0" />

                          <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-600 truncate">
                              {partner.city ||
                                "City not specified"}
                              {partner.country
                                ? `, ${partner.country}`
                                : ""}
                            </p>

                            {partner.address && (
                              <p className="text-[11px] text-gray-400 mt-1 truncate">
                                {partner.address}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Tax */}
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-600 truncate">
                          {partner.taxId ||
                            "Not specified"}
                        </p>

                        <p className="text-[10px] text-gray-400 mt-1">
                          Tax ID
                        </p>
                      </div>

                      {/* Status */}
                      <div>
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold ${
                            partner.isVerified
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-orange-50 text-orange-500"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              partner.isVerified
                                ? "bg-emerald-400"
                                : "bg-orange-400"
                            }`}
                          />

                          {partner.isVerified
                            ? "Verified"
                            : "Pending"}
                        </span>
                      </div>

                      {/* Action */}
                      <div className="flex justify-end">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setActionOpen(
                                actionOpen ===
                                  partner.userId
                                  ? null
                                  : partner.userId
                              )
                            }
                            className="w-9 h-9 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-[#F1EFFF] hover:text-[#4D44B5] transition-all"
                          >
                            <FaEllipsisH
                              size={13}
                            />
                          </button>

                          {actionOpen ===
                            partner.userId && (
                            <div className="absolute right-0 top-11 z-50 w-32 bg-white rounded-xl border border-gray-100 shadow-xl p-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(
                                    partner
                                  )
                                }
                                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-gray-600 hover:bg-[#F5F3FF] hover:text-[#4D44B5]"
                              >
                                <FaEdit size={11} />
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteClick(
                                    partner.userId
                                  )
                                }
                                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-gray-600 hover:bg-red-50 hover:text-red-500"
                              >
                                <FaTrashAlt size={11} />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Tablet / Mobile */}
                    <div className="lg:hidden">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-11 h-11 rounded-xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center font-semibold text-sm shrink-0">
                            {getInitials(
                              partner
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#303972] capitalize truncate">
                              {fullName ||
                                "Unnamed Partner"}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              Business Partner
                            </p>
                          </div>
                        </div>

                        <div className="relative shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              setActionOpen(
                                actionOpen ===
                                  partner.userId
                                  ? null
                                  : partner.userId
                              )
                            }
                            className="w-9 h-9 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-[#F1EFFF] hover:text-[#4D44B5] transition-all"
                          >
                            <FaEllipsisH
                              size={13}
                            />
                          </button>

                          {actionOpen ===
                            partner.userId && (
                            <div className="absolute right-0 top-11 z-50 w-32 bg-white rounded-xl border border-gray-100 shadow-xl p-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(
                                    partner
                                  )
                                }
                                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-gray-600 hover:bg-[#F5F3FF] hover:text-[#4D44B5]"
                              >
                                <FaEdit size={11} />
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteClick(
                                    partner.userId
                                  )
                                }
                                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-gray-600 hover:bg-red-50 hover:text-red-500"
                              >
                                <FaTrashAlt size={11} />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 pt-4 border-t border-gray-100">
                        <div className="flex items-start gap-2">
                          <FaMapMarkerAlt className="text-[#746BDA] text-[11px] mt-1" />

                          <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-300">
                              Location
                            </p>

                            <p className="text-xs font-medium text-gray-600 mt-1 truncate">
                              {partner.city ||
                                "Not specified"}
                              {partner.country
                                ? `, ${partner.country}`
                                : ""}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-300">
                            Tax ID
                          </p>

                          <p className="text-xs font-medium text-gray-600 mt-1 truncate">
                            {partner.taxId ||
                              "Not specified"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-300">
                            Status
                          </p>

                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 mt-1 rounded-full text-[11px] font-semibold ${
                              partner.isVerified
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-orange-50 text-orange-500"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                partner.isVerified
                                  ? "bg-emerald-400"
                                  : "bg-orange-400"
                              }`}
                            />

                            {partner.isVerified
                              ? "Verified"
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <div className="py-20 px-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center">
              <FaSearch size={16} />
            </div>

            <h3 className="text-base font-semibold text-[#303972] mt-4">
              No partners found
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              Try changing your search or verification filter.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      
      {filteredPartners.length > 0 && (
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-600">
              {showingFrom}-
              {showingTo}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-600">
              {filteredPartners.length}
            </span>{" "}
            partners
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={
                  safeCurrentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    safeCurrentPage - 1
                  )
                }
                className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-400 flex items-center justify-center hover:border-[#4D44B5]/40 hover:text-[#4D44B5] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronLeft
                  size={10}
                />
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) =>
                  index + 1
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
                  safeCurrentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    safeCurrentPage + 1
                  )
                }
                className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-400 flex items-center justify-center hover:border-[#4D44B5]/40 hover:text-[#4D44B5] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronRight
                  size={10}
                />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Delete popup */}
      {showDeletePopup && (
        <DeletePopup
          onConfirm={
            handleConfirmDelete
          }
          onCancel={
            handleCancelDelete
          }
        />
      )}
    </div>
  );
};

export default Partner;