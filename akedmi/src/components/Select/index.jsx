import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const FormSelect = ({
  label,
  name,
  options,
  required = true,
  includeDefaultOption = true,
  formData,
  handleChange,
  error,
}) => {
  let selectedValue = formData[name] ?? "";

  if (!includeDefaultOption && !selectedValue && options.length > 0) {
    selectedValue = options[0].value;
  }

  return (
    <div className="flex flex-col pb-6">
      <label className="text-[#303972] font-bold text-md sm:text-lg pb-4">
        {label}
        {required && " *"}
      </label>
      <div className="relative">
        <select
          name={name}
          className="bg-white w-full border border-[#C1BBEB] text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 block py-3.5 px-4 pr-10 appearance-none"
          value={selectedValue}
          onChange={handleChange}
        >
          {includeDefaultOption && (
            <option value="" disabled>
              Select {label}
            </option>
          )}
          {options.map((opt) => (
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
};
