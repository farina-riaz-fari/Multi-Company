import { useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";

const productsData = [
  {
    id: 1,
    name: "MacBook Pro 14",
    sku: "MBP-014",
    category: "Electronics",
    company: "Tech Solutions",
    price: "$1,899",
    stock: 12,
    minStock: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Wireless Keyboard",
    sku: "KEY-102",
    category: "Accessories",
    company: "Tech Solutions",
    price: "$89",
    stock: 4,
    minStock: 8,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Office Monitor 24",
    sku: "MON-024",
    category: "Electronics",
    company: "Creative Hub",
    price: "$299",
    stock: 18,
    minStock: 5,
    status: "Active",
  },
  {
    id: 4,
    name: "Office Chair",
    sku: "CHR-205",
    category: "Furniture",
    company: "Creative Hub",
    price: "$249",
    stock: 0,
    minStock: 4,
    status: "Out of Stock",
  },
  {
    id: 5,
    name: "USB-C Hub",
    sku: "USB-301",
    category: "Accessories",
    company: "Digital Works",
    price: "$49",
    stock: 7,
    minStock: 5,
    status: "Active",
  },
  {
    id: 6,
    name: "Standing Desk",
    sku: "DSK-410",
    category: "Furniture",
    company: "Digital Works",
    price: "$499",
    stock: 3,
    minStock: 5,
    status: "Low Stock",
  },
];

const Products = () => {
  const [products, setProducts] = useState(productsData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [stockFilter, setStockFilter] = useState("All Stock");
  const [openMenu, setOpenMenu] = useState(null);

  const categories = [
    "All Categories",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(searchValue) ||
        product.sku.toLowerCase().includes(searchValue) ||
        product.company.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All Categories" ||
        product.category === category;

      let matchesStock = true;

      if (stockFilter === "In Stock") {
        matchesStock = product.stock > 0;
      }

      if (stockFilter === "Low Stock") {
        matchesStock =
          product.stock > 0 && product.stock <= product.minStock;
      }

      if (stockFilter === "Out of Stock") {
        matchesStock = product.stock === 0;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, category, stockFilter]);

  const totalProducts = products.length;

  const inStock = products.filter(
    (product) => product.stock > product.minStock
  ).length;

  const lowStock = products.filter(
    (product) =>
      product.stock > 0 && product.stock <= product.minStock
  ).length;

  const outOfStock = products.filter(
    (product) => product.stock === 0
  ).length;

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );

    setOpenMenu(null);
  };

  return (
    <div className="min-h-screen px-4 py-5 md:px-8 lg:px-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
        <Navbar title="Product Management" />

        <ProfileGroup gap="gap-10" />
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4D44B5] via-[#5C52C5] to-[#756CE2] shadow-md">
        <div className="absolute -right-16 -top-24 w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute right-32 -bottom-32 w-80 h-80 rounded-full bg-white/5" />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 md:p-8">
          <div className="text-white">
            <p className="text-sm text-white/70 mb-2">
              Inventory Overview
            </p>

            <h1 className="text-2xl md:text-3xl font-bold">
              Manage your products
            </h1>

            <p className="text-sm md:text-base text-white/70 mt-2 max-w-xl">
              Keep track of products, stock levels, pricing and
              company inventory from one place.
            </p>
          </div>

          <button
            type="button"
            className="w-full lg:w-auto px-6 py-3 rounded-xl bg-white text-[#4D44B5] font-semibold text-sm shadow-sm hover:bg-gray-50 transition-colors"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Products in system"
          icon="▦"
        />

        <StatCard
          title="In Stock"
          value={inStock}
          subtitle="Healthy inventory"
          icon="✓"
        />

        <StatCard
          title="Low Stock"
          value={lowStock}
          subtitle="Needs attention"
          icon="!"
        />

        <StatCard
          title="Out of Stock"
          value={outOfStock}
          subtitle="Currently unavailable"
          icon="×"
        />
      </div>

      {/* Main Content */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 md:p-6 border-b border-gray-100">
          <div className="flex flex-col xl:flex-row xl:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, SKU or company..."
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#4D44B5] focus:ring-2 focus:ring-[#4D44B5]/10 transition"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 outline-none focus:border-[#4D44B5]"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 outline-none focus:border-[#4D44B5]"
              >
                <option>All Stock</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-[2fr_1fr_1.3fr_1fr_1fr_50px] gap-4 px-6 py-4 bg-gray-50/70 text-xs font-semibold uppercase tracking-wide text-gray-400">
          <span>Product</span>
          <span>Category</span>
          <span>Company</span>
          <span>Price</span>
          <span>Stock</span>
          <span />
        </div>

        {/* Product List */}
        <div>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                menuOpen={openMenu === product.id}
                onMenu={() =>
                  setOpenMenu(
                    openMenu === product.id ? null : product.id
                  )
                }
                onDelete={() => handleDelete(product.id)}
              />
            ))
          ) : (
            <div className="py-16 text-center">
              <div className="text-3xl text-gray-300 mb-3">
                ▦
              </div>

              <h3 className="font-semibold text-gray-600">
                No products found
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/40">
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-600">
              {filteredProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-600">
              {products.length}
            </span>{" "}
            products
          </p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-400">{title}</p>

          <h3 className="text-2xl font-bold text-[#303972] mt-2">
            {value}
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            {subtitle}
          </p>
        </div>

        <div className="w-11 h-11 rounded-xl bg-[#F0EEFF] text-[#4D44B5] flex items-center justify-center font-bold text-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

const ProductRow = ({
  product,
  menuOpen,
  onMenu,
  onDelete,
}) => {
  const getStockStatus = () => {
    if (product.stock === 0) {
      return {
        label: "Out of Stock",
        className: "bg-red-50 text-red-600",
      };
    }

    if (product.stock <= product.minStock) {
      return {
        label: "Low Stock",
        className: "bg-amber-50 text-amber-600",
      };
    }

    return {
      label: "In Stock",
      className: "bg-emerald-50 text-emerald-600",
    };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-[2fr_1fr_1.3fr_1fr_1fr_50px] gap-4 lg:items-center px-5 md:px-6 py-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition">
      {/* Product */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F0EEFF] to-[#E8E5FF] flex items-center justify-center text-[#4D44B5] font-bold">
          {product.name.charAt(0)}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#303972]">
            {product.name}
          </h4>

          <p className="text-xs text-gray-400 mt-1">
            SKU: {product.sku}
          </p>
        </div>
      </div>

      {/* Category */}
      <div>
        <span className="text-sm text-gray-600">
          {product.category}
        </span>
      </div>

      {/* Company */}
      <div>
        <span className="text-sm text-gray-600">
          {product.company}
        </span>
      </div>

      {/* Price */}
      <div>
        <span className="text-sm font-semibold text-[#303972]">
          {product.price}
        </span>
      </div>

      {/* Stock */}
      <div className="flex flex-col items-start gap-1">
        <span className="text-sm font-semibold text-gray-700">
          {product.stock} units
        </span>

        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${stockStatus.className}`}
        >
          {stockStatus.label}
        </span>
      </div>

      {/* Actions */}
      <div className="relative flex lg:justify-end">
        <button
          type="button"
          onClick={onMenu}
          className="w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
        >
          ⋮
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-10 z-20 w-32 bg-white rounded-xl border border-gray-100 shadow-lg py-1">
            <button
              type="button"
              className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              View
            </button>

            <button
              type="button"
              className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={onDelete}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;