import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    category: "",
    company: "",
    price: "",
    quantity: "",
    minimumStock: "",
    status: "Active",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Product:", formData);

    // We will connect this to ProductContext later.
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <div className="w-full px-4 pt-5 md:px-6 lg:px-8 xl:px-10">
        {/* ================= HEADER ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#39318F] via-[#4D44B5] to-[#7067D8] shadow-lg">
          {/* Decorative background */}
          <div className="absolute -right-24 -top-28 w-80 h-80 rounded-full border border-white/10 bg-white/[0.04]" />

          <div className="absolute -left-20 -bottom-32 w-64 h-64 rounded-full border border-white/10 bg-white/[0.03]" />

          <div className="absolute right-[35%] top-[-60px] w-40 h-40 rounded-full bg-white/[0.05] blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[245px]">
            {/* ================= LEFT SIDE ================= */}
            <div className="flex items-center px-6 py-6 md:px-10 lg:px-12">
              <div className="max-w-xl">
                <button
                  type="button"
                  onClick={() => navigate("/products")}
                  className="inline-flex items-center gap-2 mb-4 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  <span className="text-lg leading-none">←</span>
                  Back to Products
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-white" />

                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    Product Management
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  Add a new product
                </h1>

                <p className="mt-2 max-w-lg text-sm leading-5 text-white/70">
                  Add product details, pricing and inventory information
                  to keep your catalog organized.
                </p>
              </div>
            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="flex items-center justify-center px-6 py-6 md:px-10 lg:px-12">
              <div className="w-full max-w-[390px]">
                {/* Heading */}
                <div className="mb-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/50 font-semibold">
                    Product setup
                  </p>

                  <h2 className="text-lg font-semibold text-white mt-1">
                    Complete the details below
                  </h2>
                </div>

                {/* Steps */}
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/15" />

                  <div className="relative space-y-4">
                    {/* Step 1 */}
                    <div className="flex items-center gap-4">
                      <div className="relative z-10 w-8 h-8 rounded-full bg-white text-[#4D44B5] flex items-center justify-center text-[11px] font-bold shadow-sm">
                        01
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          Product information
                        </p>

                        <p className="text-xs text-white/50 mt-0.5">
                          Name, SKU, category and company
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-center gap-4">
                      <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 border border-white/15 text-white/60 flex items-center justify-center text-[11px] font-semibold">
                        02
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white/70">
                          Pricing & inventory
                        </p>

                        <p className="text-xs text-white/40 mt-0.5">
                          Price, quantity and stock levels
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-center gap-4">
                      <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 border border-white/15 text-white/60 flex items-center justify-center text-[11px] font-semibold">
                        03
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white/70">
                          Additional information
                        </p>

                        <p className="text-xs text-white/40 mt-0.5">
                          Description and product status
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <div className="max-w-[1500px] mx-auto py-8 md:py-10">
          <form onSubmit={handleSubmit}>
            {/* ================= PRODUCT INFORMATION ================= */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <SectionHeader
                number="01"
                title="Product Information"
                description="Basic information about the product"
              />

              <div className="p-6 md:p-8 lg:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  <Input
                    label="Product Name"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                  />

                  <Input
                    label="SKU"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g. PROD-001"
                    required
                  />

                  <Select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Select category"
                    options={[
                      "Electronics",
                      "Furniture",
                      "Office Supplies",
                      "Accessories",
                      "Other",
                    ]}
                    required
                  />

                  <Select
                    label="Company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Select company"
                    options={[
                      "Akedmi",
                      "Tech Solutions",
                      "Digital Works",
                    ]}
                    required
                  />
                </div>
              </div>
            </section>

            {/* ================= PRICING & INVENTORY ================= */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden mt-6">
              <SectionHeader
                number="02"
                title="Pricing & Inventory"
                description="Set product price and stock information"
              />

              <div className="p-6 md:p-8 lg:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  <Input
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                  />

                  <Input
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="0"
                    required
                  />

                  <Input
                    label="Minimum Stock"
                    name="minimumStock"
                    type="number"
                    value={formData.minimumStock}
                    onChange={handleChange}
                    placeholder="10"
                    required
                  />
                </div>
              </div>
            </section>

            {/* ================= ADDITIONAL INFORMATION ================= */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden mt-6">
              <SectionHeader
                number="03"
                title="Additional Information"
                description="Add a description and manage product status"
              />

              <div className="p-6 md:p-8 lg:p-10 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#303972] mb-2">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Enter product description..."
                    className="w-full rounded-xl border border-[#D9D6F2] px-4 py-3 text-sm text-gray-700 outline-none resize-none focus:ring-2 focus:ring-[#6C63CE]/20 focus:border-[#6C63CE]"
                  />
                </div>

                <Select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={["Active", "Inactive"]}
                />
              </div>
            </section>

            {/* ================= ACTIONS ================= */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-600 font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-[#4D44B5] text-white font-semibold hover:bg-[#4038A0] transition shadow-sm"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ================= SECTION HEADER ================= */

const SectionHeader = ({ number, title, description }) => (
  <div className="px-6 md:px-8 lg:px-10 py-5 border-b border-gray-100">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#EEECFF] text-[#4D44B5] flex items-center justify-center font-bold text-sm">
        {number}
      </div>

      <div>
        <h2 className="text-lg font-bold text-[#303972]">
          {title}
        </h2>

        <p className="text-sm text-gray-500 mt-0.5">
          {description}
        </p>
      </div>
    </div>
  </div>
);

/* ================= INPUT ================= */

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) => (
  <div>
    <label className="block text-sm font-semibold text-[#303972] mb-2">
      {label}

      {required && (
        <span className="text-red-500 ml-1">*</span>
      )}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      min={type === "number" ? "0" : undefined}
      className="w-full rounded-xl border border-[#D9D6F2] px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#6C63CE]/20 focus:border-[#6C63CE]"
    />
  </div>
);

/* ================= SELECT ================= */

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}) => (
  <div>
    <label className="block text-sm font-semibold text-[#303972] mb-2">
      {label}

      {required && (
        <span className="text-red-500 ml-1">*</span>
      )}
    </label>

    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="appearance-none w-full rounded-xl border border-[#D9D6F2] px-4 py-3 text-sm text-gray-700 bg-white outline-none focus:ring-2 focus:ring-[#6C63CE]/20 focus:border-[#6C63CE]"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
        ▾
      </span>
    </div>
  </div>
);

export default AddProduct;
