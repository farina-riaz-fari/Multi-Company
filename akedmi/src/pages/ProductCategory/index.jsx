import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiChevronDown,
  FiChevronRight,
  FiFolder,
  FiFolderPlus,
  FiPackage,
  FiCheckCircle,
  FiMoreVertical,
  FiEdit2,
  FiLayers,
} from "react-icons/fi";

const categoriesData = [
  {
    id: 1,
    name: "Electronics",
    code: "CAT-001",
    parent: null,
    products: 24,
    status: "Active",
    created: "Jan 12, 2026",
    description:
      "Electronic devices, computer equipment, and related technology products.",
  },
  {
    id: 2,
    name: "Computer Hardware",
    code: "CAT-005",
    parent: "Electronics",
    products: 16,
    status: "Active",
    created: "Feb 03, 2026",
    description:
      "Computer components, hardware, and internal or external peripherals.",
  },
  {
    id: 3,
    name: "Networking",
    code: "CAT-007",
    parent: "Electronics",
    products: 7,
    status: "Active",
    created: "Feb 14, 2026",
    description:
      "Networking equipment including routers, switches, and connectivity devices.",
  },
  {
    id: 4,
    name: "Accessories",
    code: "CAT-002",
    parent: null,
    products: 18,
    status: "Active",
    created: "Jan 15, 2026",
    description:
      "Accessories and supporting products used with electronic devices.",
  },
  {
    id: 5,
    name: "Mobile Accessories",
    code: "CAT-006",
    parent: "Accessories",
    products: 9,
    status: "Inactive",
    created: "Feb 08, 2026",
    description:
      "Cases, chargers, cables, and other mobile device accessories.",
  },
  {
    id: 6,
    name: "Furniture",
    code: "CAT-003",
    parent: null,
    products: 12,
    status: "Active",
    created: "Jan 18, 2026",
    description:
      "Office and workplace furniture including chairs, desks, and storage.",
  },
  {
    id: 7,
    name: "Office Supplies",
    code: "CAT-004",
    parent: null,
    products: 31,
    status: "Active",
    created: "Jan 22, 2026",
    description:
      "General office supplies and everyday workplace essentials.",
  },
];

const ProductCategory = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedCategories, setExpandedCategories] = useState([
    "Electronics",
  ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const selectedCategory = categoriesData.find(
    (category) => category.id === selectedCategoryId
  );

  const mainCategories = categoriesData.filter(
    (category) => category.parent === null
  );

  const filteredCategories = useMemo(() => {
    const searchValue = search.toLowerCase();

    return categoriesData.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(searchValue) ||
        category.code.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || category.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const toggleCategory = (categoryName) => {
    setExpandedCategories((current) =>
      current.includes(categoryName)
        ? current.filter((name) => name !== categoryName)
        : [...current, categoryName]
    );
  };

  const selectCategory = (category) => {
    setSelectedCategoryId(category.id);
  };

  const getChildren = (parentName) => {
    return categoriesData.filter(
      (category) => category.parent === parentName
    );
  };

  const visibleMainCategories = mainCategories.filter((category) =>
    filteredCategories.some((item) => item.id === category.id)
  );

  return (
    <div className="min-h-screen bg-[#F7F7FB] p-4 md:p-6 lg:p-8">
      {/* Page Header Card */}
      <div className="mb-6 overflow-hidden rounded-2xl bg-[#5B52C7] shadow-lg shadow-indigo-200/30">
        <div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-7">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                <FiLayers size={16} />
              </div>

              Product Organization
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Product Categories
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
              Organize your inventory with a clear category structure and
              hierarchy.
            </p>
          </div>

          <button
            onClick={() => navigate("/add-category")}
            className="flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#5B52C7] shadow-sm transition hover:bg-indigo-50 hover:shadow-md"
          >
            <FiPlus size={18} />
            Add Category
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <FiSearch
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-2.5">
              <span className="text-xs font-medium text-indigo-500">
                Categories
              </span>

              <span className="text-sm font-bold text-[#5B52C7]">
                {categoriesData.length}
              </span>
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-9 text-sm text-gray-700 outline-none transition focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <FiChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Category Workspace */}
      <div className="grid gap-6 lg:grid-cols-[330px_minmax(0,1fr)]">
        {/* Category Structure */}
        <div className="overflow-hidden rounded-2xl border border-[#4F46B8] bg-[#5B52C7] shadow-lg shadow-indigo-200/40">
          <div className="border-b border-white/15 bg-[#4F46B8] px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white">
                  Category Structure
                </h2>

                <p className="mt-1 text-xs text-indigo-100">
                  Browse your category hierarchy
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white">
                <FiFolder size={17} />
              </div>
            </div>
          </div>

          <div className="p-3">
            {visibleMainCategories.length > 0 ? (
              <div className="space-y-1">
                {visibleMainCategories.map((category) => {
                  const children = getChildren(category.name);
                  const isExpanded = expandedCategories.includes(
                    category.name
                  );
                  const isSelected = selectedCategoryId === category.id;

                  return (
                    <div key={category.id}>
                      <div
                        className={`group flex items-center gap-2 rounded-xl px-2 py-1.5 transition ${
                          isSelected
                            ? "bg-white shadow-md"
                            : "hover:bg-white/10"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleCategory(category.name)}
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition ${
                            isSelected
                              ? "text-gray-500 hover:bg-gray-100"
                              : "text-indigo-100 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {children.length > 0 ? (
                            isExpanded ? (
                              <FiChevronDown size={15} />
                            ) : (
                              <FiChevronRight size={15} />
                            )
                          ) : (
                            <span className="w-3" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => selectCategory(category)}
                          className="flex min-w-0 flex-1 items-center gap-3 py-2 text-left"
                        >
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                              isSelected
                                ? "bg-[#5B52C7] text-white"
                                : "bg-white/15 text-white"
                            }`}
                          >
                            <FiFolder size={15} />
                          </div>

                          <div className="min-w-0">
                            <p
                              className={`truncate text-sm font-semibold ${
                                isSelected
                                  ? "text-[#5B52C7]"
                                  : "text-white"
                              }`}
                            >
                              {category.name}
                            </p>

                            <p
                              className={`text-[11px] ${
                                isSelected
                                  ? "text-gray-400"
                                  : "text-indigo-100"
                              }`}
                            >
                              {category.products} products
                            </p>
                          </div>
                        </button>
                      </div>

                      {isExpanded && children.length > 0 && (
                        <div
                          className={`ml-5 border-l pl-3 ${
                            isSelected
                              ? "border-indigo-200"
                              : "border-white/20"
                          }`}
                        >
                          {children.map((child) => {
                            const childSelected =
                              selectedCategoryId === child.id;

                            return (
                              <button
                                key={child.id}
                                type="button"
                                onClick={() => selectCategory(child)}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                                  childSelected
                                    ? "bg-white shadow-md"
                                    : "hover:bg-white/10"
                                }`}
                              >
                                <FiFolderPlus
                                  size={15}
                                  className={
                                    childSelected
                                      ? "text-[#5B52C7]"
                                      : "text-indigo-100"
                                  }
                                />

                                <div className="min-w-0 flex-1">
                                  <p
                                    className={`truncate text-sm font-medium ${
                                      childSelected
                                        ? "text-[#5B52C7]"
                                        : "text-white"
                                    }`}
                                  >
                                    {child.name}
                                  </p>

                                  <p
                                    className={`text-[11px] ${
                                      childSelected
                                        ? "text-gray-400"
                                        : "text-indigo-100"
                                    }`}
                                  >
                                    {child.products} products
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-10 text-center">
                <FiFolder
                  size={24}
                  className="mx-auto text-indigo-200"
                />

                <p className="mt-3 text-sm font-medium text-white">
                  No categories found
                </p>

                <p className="mt-1 text-xs text-indigo-100">
                  Try another search.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Category Details */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {selectedCategory ? (
            <>
              <div className="border-b border-gray-100 p-5 sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-[#5B52C7]">
                      <FiFolder size={25} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold text-gray-900">
                          {selectedCategory.name}
                        </h2>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                            selectedCategory.status === "Active"
                              ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                              : "border-gray-200 bg-gray-50 text-gray-500"
                          }`}
                        >
                          {selectedCategory.status}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-gray-400">
                        {selectedCategory.code}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                    >
                      <FiEdit2 size={15} />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="rounded-xl border border-gray-200 p-2.5 text-gray-400 transition hover:bg-gray-50 hover:text-gray-700"
                    >
                      <FiMoreVertical size={17} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiPackage size={16} />
                      <span className="text-xs font-medium">
                        Products
                      </span>
                    </div>

                    <p className="mt-2 text-xl font-bold text-gray-900">
                      {selectedCategory.products}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiFolder size={16} />
                      <span className="text-xs font-medium">
                        Parent Category
                      </span>
                    </div>

                    <p className="mt-2 truncate text-sm font-semibold text-gray-900">
                      {selectedCategory.parent || "Main Category"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiCheckCircle size={16} />
                      <span className="text-xs font-medium">
                        Created
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-gray-900">
                      {selectedCategory.created}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-bold text-gray-900">
                    Description
                  </h3>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
                    {selectedCategory.description}
                  </p>
                </div>

                <div className="mt-7 border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        Subcategories
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        Categories nested under {selectedCategory.name}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/add-category")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#5B52C7] hover:text-[#443B9A]"
                    >
                      <FiPlus size={14} />
                      Add
                    </button>
                  </div>

                  {getChildren(selectedCategory.name).length > 0 ? (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {getChildren(selectedCategory.name).map((child) => (
                        <button
                          key={child.id}
                          type="button"
                          onClick={() => selectCategory(child)}
                          className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 text-left transition hover:border-indigo-100 hover:bg-indigo-50/40"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-[#5B52C7]">
                            <FiFolderPlus size={16} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-800">
                              {child.name}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              {child.products} products
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 rounded-xl border border-dashed border-gray-200 p-6 text-center">
                      <FiFolderPlus
                        size={22}
                        className="mx-auto text-gray-300"
                      />

                      <p className="mt-2 text-sm font-medium text-gray-600">
                        No subcategories
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        This category doesn't have any child categories yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-[500px] items-center justify-center p-6 text-center">
              <div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                  <FiFolder size={24} />
                </div>

                <h3 className="mt-4 font-semibold text-gray-900">
                  Select a category
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Choose a category from the structure to view its details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;