import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error,
}) => (
  <div className="flex flex-col w-full">
    <Label text={label} />
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`p-3 border ${
        error ? "border-[#C1BBEB]" : "border-[#C1BBEB]"
      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full`}
      placeholder={placeholder}
    />
    {error && <p className="text-sm text-red-500 font-medium mt-1">{error}</p>}
  </div>
);

export const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
}) => (
  <div className="flex flex-col w-full">
    <Label text={label} />
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`p-3 border ${
          error ? "border-red-500" : "border-[#C1BBEB]"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full appearance-none`}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "true" ? "True" : option === "false" ? "False" : option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
      </div>
    </div>
    {error && <p className="text-sm text-red-500 font-medium mt-1">{error}</p>}
  </div>
);

export const ReadonlyField = ({ label, value }) => (
  <div className="flex flex-col w-full">
    <Label text={label} />
    <div className="p-3 border border-[#C1BBEB] rounded-lg bg-[#F3F4FF] opacity-70 cursor-not-allowed text-gray-700">
      {value}
    </div>
  </div>
);

export const Label = ({ text }) => (
  <label className="text-[16px] font-semibold text-[#303972] mb-1">
    {text}
  </label>
);

export const Card = ({ title, children }) => (
  <div className="bg-white rounded-[1vw] shadow-lg mt-6 w-full">
    <div className="bg-[#4D44B5] rounded-t-[1vw] text-white lg:text-xl font-semibold p-4 px-8 h-[60px]">
      {title}
    </div>
    <div className="p-4 md:p-8 space-y-6">{children}</div>
  </div>
);

export const IconBox = ({ icon }) => (
  <div className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center">
    <img src={icon} alt="icon" className="w-[24px] h-[24px]" />
  </div>
);
