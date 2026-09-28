import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheck,
  FiChevronDown,
  FiFolder,
  FiLayers,
  FiSave,
} from "react-icons/fi";

const AddCategory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    parent: "",
    status: "Active",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required.";
    }

    if (!formData.code.trim()) {
      newErrors.code = "Category code is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Category data:", formData);

    navigate("/product-category");
  };

  return (
    <div className="min-h-screen bg-[#F7F7FB] p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 overflow-hidden rounded-2xl bg-[#5B52C7] shadow-lg shadow-indigo-200/30">
        <div className="flex flex-col gap-5 px-5 py-6 sm:px-6 lg:px-7">
          <button
            type="button"
            onClick={() => navigate("/product-category")}
            className="flex w-fit items-center gap-2 text-sm font-medium text-indigo-100 transition hover:text-white"
          >
            <FiArrowLeft size={16} />
            Back to Categories
          </button>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                  <FiLayers size={16} />
                </div>
                Product Organization
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Add Category
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
                Create a new category to organize your products and inventory.
              </p>
            </div>

            <div className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white sm:flex">
              <FiFolder size={30} />
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Main Form */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
              <h2 className="text-base font-bold text-gray-900">
                Category Information
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Enter the basic information for this category.
              </p>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              {/* Category Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Category Name
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Electronics"
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-300 ${
                    errors.name
                      ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-[#5B52C7] focus:ring-2 focus:ring-[#5B52C7]/10"
                  }`}
                />

                {errors.name && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Code + Parent */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="code"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Category Code
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="code"
                    name="code"
                    type="text"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="e.g. CAT-008"
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm uppercase text-gray-800 outline-none transition placeholder:normal-case placeholder:text-gray-300 ${
                      errors.code
                        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#5B52C7] focus:ring-2 focus:ring-[#5B52C7]/10"
                    }`}
                  />

                  {errors.code && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.code}
                    </p>
                  )}

                  <p className="mt-1.5 text-xs text-gray-400">
                    Use a unique code for easy identification.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="parent"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Parent Category
                  </label>

                  <div className="relative">
                    <select
                      id="parent"
                      name="parent"
                      value={formData.parent}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-700 outline-none transition focus:border-[#5B52C7] focus:ring-2 focus:ring-[#5B52C7]/10"
                    >
                      <option value="">No Parent Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Office Supplies">Office Supplies</option>
                    </select>

                    <FiChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>

                  <p className="mt-1.5 text-xs text-gray-400">
                    Select a parent if this is a subcategory.
                  </p>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Status
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      formData.status === "Active"
                        ? "border-[#5B52C7] bg-indigo-50/60"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === "Active"}
                      onChange={handleChange}
                      className="h-4 w-4 accent-[#5B52C7]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Active
                      </p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        Category is available for use.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      formData.status === "Inactive"
                        ? "border-gray-400 bg-gray-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === "Inactive"}
                      onChange={handleChange}
                      className="h-4 w-4 accent-gray-500"
                    />

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Inactive
                      </p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        Category will be disabled.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe what products belong to this category..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-[#5B52C7] focus:ring-2 focus:ring-[#5B52C7]/10"
                />

                <div className="mt-1.5 flex justify-end">
                  <span className="text-xs text-gray-400">
                    {formData.description.length}/500
                  </span>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/60 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={() => navigate("/product-category")}
                className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#5B52C7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4F46B8] hover:shadow-md"
              >
                <FiSave size={16} />
                Save Category
              </button>
            </div>
          </div>

          {/* Side Information */}
          <div className="h-fit rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-[#5B52C7]">
                  <FiCheck size={19} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-gray-900">
                    Category Guidelines
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    A few things to keep in mind
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-[#5B52C7]">
                  1
                </span>

                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Keep names clear
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Use simple names that clearly describe the products inside
                    the category.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-[#5B52C7]">
                  2
                </span>

                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Use unique codes
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Category codes should be unique so they can be identified
                    easily.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-[#5B52C7]">
                  3
                </span>

                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Use hierarchy carefully
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Choose a parent category when creating a related
                    subcategory.
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-5 mb-5 rounded-xl bg-[#5B52C7] p-4">
              <div className="flex items-start gap-3">
                <FiFolder className="mt-0.5 shrink-0 text-white" size={18} />

                <div>
                  <p className="text-sm font-semibold text-white">
                    Category hierarchy
                  </p>

                  <p className="mt-1 text-xs leading-5 text-indigo-100">
                    A well-organized category structure makes products easier
                    to manage and find.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
