import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiBookOpen,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";
import Navbar from "../../components/Navbar";

const AddAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    type: "",
    parent: "",
    balance: "",
    description: "",
    status: "Active",
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

    console.log("Account Data:", formData);

    navigate("/chart");
  };

  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      <Navbar />

      <main className="px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">

          {/* Header */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#443B9A] via-[#5B52C7] to-[#7067D8] shadow-lg">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative p-7 md:p-9">
              <button
                type="button"
                onClick={() => navigate("/chart")}
                className="mb-6 flex items-center gap-2 text-sm font-medium text-purple-100 transition hover:text-white"
              >
                <FiArrowLeft size={17} />
                Back to Chart of Accounts
              </button>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                  <FiBookOpen size={26} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-100">
                    Accounting
                  </p>

                  <h1 className="mt-1 text-2xl font-bold text-white md:text-3xl">
                    Add Account
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-purple-100">
                    Create a new financial account and add it to your chart of
                    accounts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">

            {/* Account Information */}
            <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-5 md:px-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EEFF] text-sm font-bold text-[#5B52C7]">
                    01
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      Account Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Enter the basic details of the account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 px-6 py-6 md:grid-cols-2 md:px-8">

                {/* Account Code */}
                <InputField
                  label="Account Code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g. 1000"
                  required
                />

                {/* Account Name */}
                <InputField
                  label="Account Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Cash & Bank"
                  required
                />

                {/* Account Type */}
                <SelectField
                  label="Account Type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  options={[
                    "Asset",
                    "Liability",
                    "Equity",
                    "Revenue",
                    "Expense",
                  ]}
                  placeholder="Select account type"
                  required
                />

                {/* Parent Account */}
                <SelectField
                  label="Parent Account"
                  name="parent"
                  value={formData.parent}
                  onChange={handleChange}
                  options={[
                    "Current Assets",
                    "Current Liabilities",
                    "Equity",
                    "Operating Revenue",
                    "Expenses",
                  ]}
                  placeholder="Select parent account"
                />
              </div>
            </section>

            {/* Financial Details */}
            <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-5 md:px-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EEFF] text-sm font-bold text-[#5B52C7]">
                    02
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      Financial Details
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Set the opening balance and account status.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 px-6 py-6 md:grid-cols-2 md:px-8">

                {/* Opening Balance */}
                <InputField
                  label="Opening Balance"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  placeholder="e.g. 25000"
                  type="number"
                />

                {/* Status */}
                <SelectField
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={["Active", "Inactive"]}
                  placeholder="Select status"
                />
              </div>
            </section>

            {/* Description */}
            <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-5 md:px-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EEFF] text-sm font-bold text-[#5B52C7]">
                    03
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      Additional Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Add an optional description for this account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-6 md:px-8">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Add a short description about this account..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#8A83DD] focus:bg-white focus:ring-2 focus:ring-[#8A83DD]/10"
                />
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/chart")}
                className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#5B52C7] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4d45b0]"
              >
                <FiCheck size={17} />
                Add Account
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

/* Input */
const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#8A83DD] focus:bg-white focus:ring-2 focus:ring-[#8A83DD]/10"
    />
  </div>
);

/* Select */
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>

    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm text-gray-700 outline-none transition focus:border-[#8A83DD] focus:bg-white focus:ring-2 focus:ring-[#8A83DD]/10"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <FiChevronDown
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={17}
      />
    </div>
  </div>
);

export default AddAccount;