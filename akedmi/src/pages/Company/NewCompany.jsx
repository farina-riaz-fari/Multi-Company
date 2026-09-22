import React, { useContext, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { CompanyContext } from "../../store/CompanyContext";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import { v4 as uuidv4 } from "uuid";
import { FormInput } from "../../components/Input";
import { FormSelect } from "../../components/Select";
import { CurrencySelect } from "../../components/CurrencySelect";
import { DateTimeInput } from "../../components/DateAndTimeDropdown";
import Button from "../../components/Button";
import UserContext from "../../store/UserContext";
import { PartnerContext } from "../../store/PartnerContext";
import { EmployeeContext } from "../../store/EmployeeContext";

const NewCompany = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addCompany, updateCompany } = useContext(CompanyContext);
  const { users } = useContext(UserContext);
  const { partners } = useContext(PartnerContext);
  const { employees } = useContext(EmployeeContext);
  const companyData = location.state?.company;
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    id: companyData?.id || uuidv4(),
    registrationNo: companyData?.registrationNo || "",
    companyName: companyData?.companyName || "",
    industry: companyData?.industry || "",
    city: companyData?.city || "",
    email: companyData?.email || "",
    phoneNumber: companyData?.phoneNumber || "",
    address: companyData?.address || "",
    country: companyData?.country || "",
    website: companyData?.website || "",
    zipCode: companyData?.zipCode || "",
    taxId: companyData?.taxId || "",
    currency: companyData?.currency || "PKR",
    status: companyData?.status || "Active",
    parentCompany: companyData?.parentCompany || "",
    registrationDate: companyData?.registrationDate || "",
    owner: companyData?.owner || "",
    businessType: companyData?.businessType || "",
    isVerified: companyData?.isVerified || "True",
    createdAt: companyData?.createdAt || new Date().toISOString(),
    updatedAt: companyData?.updatedAt || "",
  });

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

  const requiredFields = [
    "companyName",
    "industry",
    "email",
    "phoneNumber",
    "country",
    "city",
    "currency",
    "status",
    "registrationDate",
    "owner",
    "businessType",
    "isVerified",
    "createdAt",
  ];

  const fieldLabels = {
    companyName: "Company Name",
    industry: "Industry",
    email: "Email",
    phoneNumber: "Phone Number",
    country: "Country",
    city: "City",
    currency: "Currency",
    status: "Status",
    registrationDate: "Registration Date",
    owner: "Owner",
    businessType: "Business Type",
    isVerified: "Is Verified",
    createdAt: "Created At",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        const label = fieldLabels[field] || field;
        newFormErrors[field] = `${label} is required.`;
      }
    });

    if (formData.email && !formData.email.includes("@")) {
      newFormErrors.email = "Please add '@' in the email.";
    }

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

    if (companyData) {
      updateCompany({
        ...formData,
        updatedAt: new Date().toISOString(),
      });
    } else {
      addCompany(formData);
    }

    navigate("/company");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/company");
  };

  const ownerOptions = useMemo(
    () => [
      ...users.map((user) => ({
        value: `${user.firstName} ${user.lastName}`,
        label: `${user.firstName} ${user.lastName}`,
      })),
      ...employees.map((employee) => ({
        value: `${employee.first_name} ${employee.last_name}`,
        label: `${employee.first_name} ${employee.last_name}`,
      })),
      ...partners.map((partner) => ({
        value: `${partner.firstName} ${partner.lastName}`,
        label: `${partner.firstName} ${partner.lastName}`,
      })),
    ],
    [users, employees, partners]
  );

  const sectionConfig = [
    {
      id: "basic",
      number: "01",
      title: "Company Information",
      description: "Enter the basic details of your company.",
      icon: "🏢",
    },
    {
      id: "contact",
      number: "02",
      title: "Contact Information",
      description: "Add the company's communication and location details.",
      icon: "📍",
    },
    {
      id: "financial",
      number: "03",
      title: "Financial Information",
      description: "Configure financial identification and currency settings.",
      icon: "💳",
    },
    {
      id: "operations",
      number: "04",
      title: "Operational Details",
      description: "Define company status, registration, and hierarchy.",
      icon: "⚙️",
    },
    {
      id: "ownership",
      number: "05",
      title: "Ownership & Compliance",
      description: "Set ownership and verification information.",
      icon: "🛡️",
    },
    {
      id: "timestamps",
      number: "06",
      title: "Record Information",
      description: "Review system-generated record timestamps.",
      icon: "🕒",
    },
  ];

  const renderSectionHeader = (section) => (
    <div className="flex items-start gap-4 border-b border-slate-100 px-5 py-5 sm:px-7">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4D44B5]/10 text-xl">
        {section.icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xs font-bold tracking-widest text-[#4D44B5]">
            {section.number}
          </span>

          <h2 className="text-base font-bold text-slate-800 sm:text-lg">
            {section.title}
          </h2>
        </div>

        <p className="text-sm leading-6 text-slate-500">
          {section.description}
        </p>
      </div>
    </div>
  );

  const renderSection = (section, children) => (
    <section
      key={section.id}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {renderSectionHeader(section)}

      <div className="p-5 sm:p-7">{children}</div>
    </section>
  );

  return (
    <div className="min-h-screen w-full bg-[#F5F6FC]">
      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Navbar
            title={companyData ? "Edit Company" : "Add New Company"}
          />

          <ProfileGroup gap="gap-6" />
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-[#302875] via-[#4D44B5] to-[#7168D9] px-5 py-7 text-white shadow-lg sm:px-8 sm:py-9">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
                Company Management
              </div>

              <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
                {companyData
                  ? "Update your company information"
                  : "Set up your company profile"}
              </h1>

              <p className="max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                {companyData
                  ? "Review and update the company details below to keep your records accurate."
                  : "Complete the following sections to create a detailed company profile in your management system."}
              </p>
            </div>

            <div className="hidden h-24 w-24 items-center justify-center rounded-2xl bg-white/10 text-5xl lg:flex">
              🏢
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderSection(
            sectionConfig[0],
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <FormInput
                label="Company Name"
                name="companyName"
                type="text"
                required
                formData={formData}
                handleChange={handleChange}
                error={formErrors.companyName}
              />
              <FormInput
                label="Registration Number"
                name="registrationNo"
                type="text"
                required={false}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.registrationNo}
              />

              <FormSelect
                label="Industry"
                name="industry"
                options={[
                  { value: "tech", label: "Tech" },
                  { value: "finance", label: "Finance" },
                  { value: "healthcare", label: "Healthcare" },
                ]}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.industry}
              />
            </div>
          )}

          {renderSection(
            sectionConfig[1],
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <FormInput
                label="Email"
                name="email"
                type="text"
                required
                disabled={!!companyData}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.email}
              />
              <FormInput
                label="Phone Number"
                name="phoneNumber"
                type="text"
                required
                formData={formData}
                handleChange={handleChange}
                error={formErrors.phoneNumber}
              />
              <FormInput
                label="Country"
                name="country"
                type="text"
                required
                formData={formData}
                handleChange={handleChange}
                error={formErrors.country}
              />

              <FormInput
                label="City"
                name="city"
                type="text"
                required
                formData={formData}
                handleChange={handleChange}
                error={formErrors.city}
              />

              <FormInput
                label="Website"
                name="website"
                type="text"
                required={false}
                formData={formData}
                handleChange={handleChange}
              />

              <FormInput
                label="Zip Code"
                name="zipCode"
                type="text"
                required={false}
                formData={formData}
                handleChange={handleChange}
              />

              <div className="lg:col-span-2">
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
          )}

          {renderSection(
            sectionConfig[2],
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <FormInput
                label="Tax ID"
                name="taxId"
                type="text"
                required={false}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.taxId}
              />

              <CurrencySelect
                label="Currency"
                name="currency"
                formData={formData}
                setFormData={setFormData}
                error={formErrors.currency}
              />
            </div>
          )}

          {renderSection(
            sectionConfig[3],
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <FormSelect
                label="Status"
                name="status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                  { value: "suspended", label: "Suspended" },
                ]}
                includeDefaultOption={false}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.status}
              />
              <DateTimeInput
                label="Registration Date"
                name="registrationDate"
                formData={formData}
                setFormData={setFormData}
                error={formErrors.registrationDate}
              />

              <FormSelect
                label="Parent Company"
                name="parentCompany"
                options={[
                  {
                    value: "externalCompany",
                    label: "External Company",
                  },
                  {
                    value: "selfReference",
                    label: "Self-Reference",
                  },
                  {
                    value: "otherCompany",
                    label: "Other Company",
                  },
                ]}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.parentCompany}
              />
            </div>
          )}

          {renderSection(
            sectionConfig[4],
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <FormSelect
                label="Owner"
                name="owner"
                options={ownerOptions}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.owner}
              />
              <FormSelect
                label="Business Type"
                name="businessType"
                options={[
                  { value: "private", label: "Private" },
                  { value: "public", label: "Public" },
                  { value: "nonProfit", label: "Non-Profit" },
                ]}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.businessType}
              />

              <FormSelect
                label="Is Verified"
                name="isVerified"
                options={[
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ]}
                includeDefaultOption={false}
                formData={formData}
                handleChange={handleChange}
                error={formErrors.isVerified}
              />
            </div>
          )}

          {renderSection(
            sectionConfig[5],
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <DateTimeInput
                label="Created At"
                name="createdAt"
                required
                disabled
                formData={formData}
                setFormData={setFormData}
              />

              {companyData && (
                <DateTimeInput
                  label="Updated At"
                  name="updatedAt"
                  disabled
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
            </div>
          )}

          <div className="sticky bottom-4 z-10 flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:justify-end sm:gap-4 sm:p-5">
            <Button
              text="Cancel"
              hasBorder
              borderColor="#4D44B5"
              onClick={handleCancel}
              className="w-full px-8 sm:w-auto sm:px-12"
            />

            <Button
              type="submit"
              text={companyData ? "Update Company" : "Create Company"}
              hasBackground
              bgColor="#4D44B5"
              className="w-full text-white sm:w-auto sm:px-10"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCompany;
