import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import { EmployeeContext } from "../../store/EmployeeContext";
import { v4 as uuidv4 } from "uuid";
import { FormInput } from "../../components/Input";
import { FormSelect } from "../../components/Select";
import { DateTimeInput } from "../../components/DateAndTimeDropdown";
import Button from "../../components/Button";
import { CompanyContext } from "../../store/CompanyContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faBuilding, faFolderOpen, faUser } from "@fortawesome/free-regular-svg-icons";

const AddEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { addEmployee, updateEmployee } = useContext(EmployeeContext);
  const { companies } = useContext(CompanyContext);

  const employeeData = location.state?.employee;
  const returnPath = location.state?.returnPath;

  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    id: employeeData?.id || uuidv4(),
    employee_code: employeeData?.employee_code || "",
    first_name: employeeData?.first_name || "",
    last_name: employeeData?.last_name || "",
    address: employeeData?.address || "",
    national_id: employeeData?.national_id || "",
    passport_number: employeeData?.passport_number || "",
    gender: employeeData?.gender || "",
    email: employeeData?.email || "",
    phone_number: employeeData?.phone_number || "",
    profileImage: employeeData?.profileImage || "",

    job_title: employeeData?.job_title || "",
    department_id: employeeData?.department_id || "",
    employment_type: employeeData?.employment_type || "",
    hire_date: employeeData?.hire_date || "",
    termination_date: employeeData?.termination_date || "",
    status: employeeData?.status || "",
    company: employeeData?.company || "",
    role: employeeData?.role || "",

    salary: employeeData?.salary || "",
    bank_account_number: employeeData?.bank_account_number || "",
    bank_name: employeeData?.bank_name || "",
    tax_identification_number:
      employeeData?.tax_identification_number || "",
    is_tax_exempt: employeeData?.is_tax_exempt || "",
    payment_method: employeeData?.payment_method || "",

    created_at: employeeData?.created_at || new Date().toISOString(),
    updated_at: employeeData?.updated_at || "",
  });

  const requiredFields = [
    "employee_code",
    "email",
    "first_name",
    "last_name",
    "job_title",
    "employment_type",
    "hire_date",
    "status",
    "company",
    "salary",
    "is_tax_exempt",
    "payment_method",
    "gender",
    "phone_number",
    "role",
  ];

  const fieldLabels = {
    employee_code: "Employee Code",
    first_name: "First Name",
    last_name: "Last Name",
    job_title: "Job Title",
    employment_type: "Employment Type",
    hire_date: "Hire Date",
    status: "Status",
    salary: "Salary",
    is_tax_exempt: "Tax Exempt",
    payment_method: "Payment Method",
    company: "Company",
    email: "Email",
    gender: "Gender",
    phone_number: "Phone Number",
    role: "Role",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      status: formData.status || "Active",
      is_tax_exempt: formData.is_tax_exempt || "true",
    };

    const newFormErrors = {};

    requiredFields.forEach((field) => {
      if (!submissionData[field]) {
        const label = fieldLabels[field] || field;
        newFormErrors[field] = `${label} is required.`;
      }
    });

    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);

      const firstErrorField = Object.keys(newFormErrors)[0];
      const element = document.querySelector(
        `[name="${firstErrorField}"]`
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        element.focus();
      }

      return;
    }

    setFormErrors({});

    if (employeeData) {
      updateEmployee({
        ...submissionData,
        updated_at: new Date().toISOString(),
      });
    } else {
      addEmployee(submissionData);
    }

    navigate(returnPath || "/employee");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(returnPath || "/employee");
  };

  const SectionHeader = ({ number, title, description }) => (
    <div className="flex items-start gap-4 mb-7">
      <div className="w-9 h-9 shrink-0 rounded-xl bg-[#4D44B5] text-white flex items-center justify-center text-sm font-bold shadow-sm">
        {number}
      </div>

      <div>
        <h2 className="text-[#303972] text-lg sm:text-xl font-bold">
          {title}
        </h2>

        <p className="text-[#9295AA] text-sm mt-1">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex w-full min-h-screen bg-[#F6F7FB]">
      <div className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8">
        {/* Navbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-7">
          <Navbar
            title={employeeData ? "Edit Employee" : "Add New Employee"}
          />

          <ProfileGroup gap="gap-10" />
        </div>

        {/* Main form */}
        <form onSubmit={handleSubmit}>
          {/* Profile Header */}
          <div className="bg-white rounded-2xl border border-[#E8E8F2] shadow-sm overflow-hidden mb-6">
            {/* Gradient Banner */}
            <div className="h-24 sm:h-28 bg-gradient-to-r from-[#4D44B5] via-[#6259C8] to-[#8179DD] relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -right-10 -top-20 w-64 h-64 rounded-full border-[40px] border-white/20" />
                <div className="absolute right-32 top-5 w-28 h-28 rounded-full border-[20px] border-white/10" />
                <div className="absolute right-1/3 -bottom-16 w-40 h-40 rounded-full border-[25px] border-white/10" />
              </div>

              <div className="relative h-full flex items-start justify-between gap-3 px-5 sm:px-8 pt-5">
                <div>
                  <p className="text-white/90 text-xs font-semibold tracking-[0.18em] uppercase">
                    Employee Profile
                  </p>

                  <p className="text-white/70 text-xs mt-1">
                    {employeeData
                      ? "Manage employee information"
                      : "Create a new employee record"}
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-3 py-1.5 text-white text-xs font-medium backdrop-blur-sm whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  {employeeData ? "Edit Mode" : "New Record"}
                </span>
              </div>
            </div>

            {/* Profile Content */}
            <div className="px-5 sm:px-8 pb-6 sm:pb-7">
              <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-7 -mt-12 sm:-mt-14 relative">
                {/* Avatar */}
                <label className="group relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl border-4 border-white bg-[#F2F1FA] shadow-lg overflow-hidden cursor-pointer">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Employee"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#4D44B5]">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="w-10 h-10 mb-1"
                      />

                      <span className="text-xs font-medium">
                        Add Photo
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {formData.profileImage
                        ? "Change Photo"
                        : "Upload Photo"}
                    </span>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>

                {/* Employee Identity */}
                <div className="flex-1 min-w-0 lg:py-3">
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <h1 className="text-[#FFFFFF] text-2xl sm:text-3xl font-bold tracking-tight break-words">
                      {formData.first_name || formData.last_name
                        ? `${formData.first_name} ${formData.last_name}`.trim()
                        : "New Employee"}
                    </h1>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        (formData.status || "Active") === "Active"
                          ? "bg-[#EAF8EF] text-[#249653]"
                          : (formData.status || "Active") === "On Leave"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-[#F1F1F7] text-[#777B91]"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {formData.status || "Active"}
                    </span>
                  </div>

                  <p className="text-[#777B91] text-sm sm:text-base font-medium">
                    {formData.job_title || "Job Title not assigned"}
                  </p>

                  <p className="text-[#9A9CAF] text-sm mt-1">
                    {employeeData
                      ? "Employee information and employment details"
                      : "Complete the sections below to add employee details"}
                  </p>
                </div>

                {/* Employee Details Panel */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3 lg:gap-4 lg:min-w-[300px] xl:min-w-[390px] lg:border-l lg:border-[#E8E8F2] lg:pl-6 lg:py-2">
                  {/* Employee Code */}
                  <div className="flex items-center gap-3 rounded-xl bg-[#F8F8FC] border border-[#EEEEF6] px-3.5 py-3">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#EEECFC] flex items-center justify-center text-[#4D44B5]">
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        className="w-5 h-5"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] text-[#9295AA] font-medium mb-1">
                        Employee Code
                      </p>

                      <p className="text-sm font-semibold text-[#303972] truncate">
                        {formData.employee_code || "Not assigned"}
                      </p>
                    </div>
                  </div>

                  {/* Company */}
                  <div className="flex items-center gap-3 rounded-xl bg-[#F8F8FC] border border-[#EEEEF6] px-3.5 py-3">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#E8F5FF] flex items-center justify-center text-[#3484C5]">
                      <FontAwesomeIcon
                        icon={faBuilding}
                        className="w-5 h-5"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] text-[#9295AA] font-medium mb-1">
                        Company
                      </p>

                      <p className="text-sm font-semibold text-[#303972] truncate">
                        {formData.company || "Not assigned"}
                      </p>
                    </div>
                  </div>

                  {/* Employment Type */}
                  <div className="flex items-center gap-3 rounded-xl bg-[#F8F8FC] border border-[#EEEEF6] px-3.5 py-3">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#EAF8EF] flex items-center justify-center text-[#249653]">
                      <FontAwesomeIcon
                        icon={faFolderOpen}
                        className="w-5 h-5"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] text-[#9295AA] font-medium mb-1">
                        Employment Type
                      </p>

                      <p className="text-sm font-semibold text-[#303972] truncate">
                        {formData.employment_type || "Not assigned"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-[#E8E8F2] shadow-sm p-5 sm:p-8 mb-6">
            <SectionHeader
              number="01"
              title="Personal Information"
              description="Basic information and contact details."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
              <FormInput
                label="Employee Code"
                name="employee_code"
                type="text"
                required
                disabled={!!employeeData}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.employee_code}
              />

              <FormInput
                label="Email"
                name="email"
                type="text"
                required
                disabled={!!employeeData}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.email}
              />

              <FormInput
                label="First Name"
                name="first_name"
                type="text"
                required
                formData={formData}
                handleChange={handleChange}
                error={formErrors.first_name}
              />

              <FormInput
                label="Last Name"
                name="last_name"
                type="text"
                required
                formData={formData}
                handleChange={handleChange}
                error={formErrors.last_name}
              />

              <FormInput
                label="Phone Number"
                name="phone_number"
                type="text"
                required
                formData={formData}
                handleChange={handleChange}
                error={formErrors.phone_number}
              />

              <FormSelect
                label="Gender"
                name="gender"
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.gender}
              />

              <FormInput
                label="National ID"
                name="national_id"
                type="text"
                required={false}
                formData={formData}
                handleChange={handleChange}
              />

              <FormInput
                label="Passport Number"
                name="passport_number"
                type="text"
                required={false}
                formData={formData}
                handleChange={handleChange}
              />

              <div className="md:col-span-2">
                <FormInput
                  label="Address"
                  name="address"
                  type="textarea"
                  required={false}
                  formData={formData}
                  handleChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Employment */}
          <div className="bg-white rounded-2xl border border-[#E8E8F2] shadow-sm p-5 sm:p-8 mb-6">
            <SectionHeader
              number="02"
              title="Employment Details"
              description="Define the employee's position, company, and employment status."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
              <FormSelect
                label="Job Title"
                name="job_title"
                options={[
                  {
                    value: "Frontend Developer",
                    label: "Frontend Developer",
                  },
                  {
                    value: "Backend Developer",
                    label: "Backend Developer",
                  },
                  {
                    value: "Full Stack Developer",
                    label: "Full Stack Developer",
                  },
                  {
                    value: "Graphics Designer",
                    label: "Graphics Designer",
                  },
                ]}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.job_title}
              />

              <FormSelect
                label="Department"
                name="department_id"
                options={[
                  { value: "HR", label: "HR" },
                  { value: "Marketing", label: "Marketing" },
                  { value: "Engineering", label: "Engineering" },
                ]}
                formData={formData}
                handleChange={handleChange}
              />

              <FormSelect
                label="Employment Type"
                name="employment_type"
                options={[
                  { value: "Full-Time", label: "Full-Time" },
                  { value: "Part-Time", label: "Part-Time" },
                  { value: "Contract", label: "Contract" },
                  { value: "Intern", label: "Intern" },
                ]}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.employment_type}
              />

              <FormSelect
                label="Company"
                name="company"
                options={companies.map((c) => ({
                  value: c.companyName,
                  label: c.companyName,
                }))}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.company}
              />

              <DateTimeInput
                label="Hire Date"
                name="hire_date"
                required
                formData={formData}
                setFormData={setFormData}
                error={formErrors.hire_date}
              />

              <DateTimeInput
                label="Termination Date"
                name="termination_date"
                required={false}
                formData={formData}
                setFormData={setFormData}
              />

              <FormSelect
                label="Status"
                name="status"
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Resigned", label: "Resigned" },
                  { value: "Terminated", label: "Terminated" },
                  { value: "On Leave", label: "On Leave" },
                ]}
                includeDefaultOption={false}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.status}
              />

              <FormSelect
                label="Role"
                name="role"
                options={[
                  { value: "Manager", label: "Manager" },
                  { value: "Employee", label: "Employee" },
                  { value: "Director", label: "Director" },
                ]}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.role}
              />
            </div>
          </div>

          {/* Payroll */}
          <div className="bg-white rounded-2xl border border-[#E8E8F2] shadow-sm p-5 sm:p-8 mb-6">
            <SectionHeader
              number="03"
              title="Salary & Payroll"
              description="Payment, banking, and tax information."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
              <FormInput
                label="Salary"
                name="salary"
                type="number"
                required
                formData={formData}
                handleChange={handleChange}
                error={formErrors.salary}
              />

              <FormSelect
                label="Payment Method"
                name="payment_method"
                options={[
                  {
                    value: "Bank Transfer",
                    label: "Bank Transfer",
                  },
                  {
                    value: "Cash",
                    label: "Cash",
                  },
                  {
                    value: "Check",
                    label: "Check",
                  },
                ]}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.payment_method}
              />

              <FormInput
                label="Bank Account Number"
                name="bank_account_number"
                type="text"
                required={false}
                formData={formData}
                handleChange={handleChange}
              />

              <FormInput
                label="Bank Name"
                name="bank_name"
                type="text"
                required={false}
                formData={formData}
                handleChange={handleChange}
              />

              <FormInput
                label="Tax ID"
                name="tax_identification_number"
                type="text"
                required={false}
                formData={formData}
                handleChange={handleChange}
              />

              <FormSelect
                label="Is Tax Exempt"
                name="is_tax_exempt"
                options={[
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ]}
                includeDefaultOption={false}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.is_tax_exempt}
              />
            </div>
          </div>

          {/* Record information */}
          <div className="bg-white rounded-2xl border border-[#E8E8F2] shadow-sm p-5 sm:p-8 mb-6">
            <SectionHeader
              number="04"
              title="Record Information"
              description="System-generated timestamps for this employee record."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
              <DateTimeInput
                label="Created At"
                name="created_at"
                required
                disabled
                formData={formData}
                setFormData={setFormData}
              />

              {employeeData && (
                <DateTimeInput
                  label="Updated At"
                  name="updated_at"
                  disabled
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-10">
            <p className="text-xs text-[#9699AB] text-center sm:text-left">
              Fields marked as required must be completed before saving.
            </p>

            <div className="flex items-center gap-3">
              <Button
                text="Cancel"
                hasBorder={true}
                borderColor="#4D44B5"
                onClick={handleCancel}
                className="px-7 sm:px-10 whitespace-nowrap"
              />

              <Button
                type="submit"
                text={employeeData ? "Update Employee" : "Create Employee"}
                hasBackground={true}
                bgColor="#4D44B5"
                className="text-white px-7 sm:px-10 whitespace-nowrap min-w-[150px]"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;