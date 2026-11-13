import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export function CurrencySelect({
  label,
  name,
  required = true,
  formData,
  setFormData,
  error,
}) {
  const currencyOptions = [
    { value: "PKR", label: "PKR - Pakistani Rupee" },
    { value: "USD", label: "USD - United States Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "SAR", label: "SAR - Saudi Riyal" },
    { value: "AED", label: "AED - UAE Dirham" },
    { value: "JPY", label: "JPY - Japanese Yen" },
    { value: "CNY", label: "CNY - Chinese Yuan" },
    { value: "INR", label: "INR - Indian Rupee" },
    { value: "QAR", label: "QAR - Qatari Rial" },
    { value: "KWD", label: "KWD - Kuwaiti Dinar" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
    { value: "AUD", label: "AUD - Australian Dollar" },
    { value: "CHF", label: "CHF - Swiss Franc" },
    { value: "MYR", label: "MYR - Malaysian Ringgit" },
  ];

  const selectedValue = formData[name] || "PKR";

  return (
    <div className="flex flex-col pb-6">
      <label className="text-[#303972] font-bold text-md sm:text-lg pb-4">
        {label}
        {required && " *"}
      </label>
      <div className="relative">
        <select
          name={name}
          className="bg-white w-full border border-[#C1BBEB] text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 block py-3 px-4 pr-10 appearance-none"
          value={selectedValue}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [name]: e.target.value,
            }))
          }
        >
          {currencyOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
