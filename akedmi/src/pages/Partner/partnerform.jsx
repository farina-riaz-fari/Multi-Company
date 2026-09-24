import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PartnerContext } from "../../store/PartnerContext";
import { v4 as uuidv4 } from "uuid";
import {
  Input,
  Select,
  ReadonlyField,
} from "./CommonComponent/PartnerComponent";
import Button from "../../components/Button";
import ProfileGroup from "../../components/ProfileGroup";
import Navbar from "../../components/Navbar";
import { CompanyContext } from "../../store/CompanyContext";

const PartnerForm = () => {
  const navigate = useNavigate();
  const { companies } = useContext(CompanyContext);

  const location = useLocation();
  const editingPartner = location.state?.partner;
  const returnPath = location.state?.returnPath;

  const { addPartner, updatePartner } = useContext(PartnerContext);

  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    companyId: "",
    company: "",
    role: "",
    name: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
    taxId: "",
    isVerified: true,
    agreementSigned: true,
    agreementDocument: "",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: "",
    profileImage: "",
  });

  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  const roles = ["Manager", "Employee", "Director"];

  useEffect(() => {
    const now = new Date().toISOString();

    if (editingPartner) {
      setFormData({
        ...editingPartner,
        createdAt: editingPartner.createdAt || now,
        updatedAt: editingPartner.updatedAt || "",
        profileImage: editingPartner.profileImage || "",
      });

      setProfileImage(editingPartner.profileImage || null);
    }
  }, [editingPartner]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    const parsedValue =
      value === "true" ? true : value === "false" ? false : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName)
      newErrors.firstName = "First name is required";

    if (!formData.lastName)
      newErrors.lastName = "Last name is required";

    if (!formData.country)
      newErrors.country = "Country is required";

    if (!formData.city)
      newErrors.city = "City is required";

    if (!formData.agreementSigned)
      newErrors.agreementSigned = "Agreement must be signed";

    if (
      formData.isVerified === null ||
      formData.isVerified === undefined
    ) {
      newErrors.isVerified = "Verification status is required";
    }

    if (!formData.email)
      newErrors.email = "Email is required";

    if (!formData.gender)
      newErrors.gender = "Gender is required";

    if (!formData.companyId)
      newErrors.companyId = "Company is required";

    if (!formData.role)
      newErrors.role = "Role is required";

    if (!formData.status)
      newErrors.status = "Status is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const scrollToError = () => {
    const firstErrorField = Object.keys(errors)[0];

    const element = document.getElementsByName(firstErrorField)[0];

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      scrollToError();
      return;
    }

    const now = new Date().toISOString();
    const finalUserId = formData.userId || uuidv4();

    const partnerData = {
      ...formData,
      userId: finalUserId,
      createdAt: formData.createdAt || now,
      profileImage: profileImage || formData.profileImage || "",
    };

    const isEdit = !!editingPartner;

    const isChanged =
      !editingPartner ||
      Object.keys(partnerData).some(
        (key) => partnerData[key] !== editingPartner[key]
      );

    partnerData.updatedAt = isChanged
      ? now
      : editingPartner?.updatedAt || "";

    try {
      if (isEdit) {
        await updatePartner(partnerData);
      } else {
        await addPartner(partnerData);
      }

      navigate(returnPath || "/partner");
    } catch (error) {
      console.error("Failed to submit partner data:", error);
    }
  };

  return (
    <div className="min-h-screen px-4 py-5 md:px-8 lg:px-10">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
        <Navbar
          title={editingPartner ? "Edit Partner" : "Add Partner"}
        />

        <ProfileGroup gap="gap-10" />
      </div>

      <form onSubmit={handleSubmit} className="max-w-[1400px] mx-auto">
        {/* PROFILE HEADER */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4D44B5] via-[#5B51C7] to-[#746BE0] shadow-md">
          <div className="absolute -right-20 -top-24 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute right-24 -bottom-28 w-72 h-72 rounded-full bg-white/5" />

          <div className="relative flex flex-col sm:flex-row items-center sm:items-center gap-5 p-6 md:p-8">
            {/* Avatar */}
            <label className="relative flex-shrink-0 w-24 h-24 rounded-full overflow-hidden border-4 border-white/80 bg-white/20 cursor-pointer group">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Partner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-3xl font-semibold text-white">
                    {formData.firstName?.charAt(0)?.toUpperCase() || "P"}
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  Change
                </span>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* Partner summary */}
            <div className="text-center sm:text-left text-white flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h2 className="text-xl md:text-2xl font-bold">
                  {formData.firstName || formData.lastName
                    ? `${formData.firstName} ${formData.lastName}`.trim()
                    : "New Partner"}
                </h2>

                <span className="w-fit mx-auto sm:mx-0 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-medium">
                  {formData.status || "Active"}
                </span>
              </div>

              <p className="text-sm text-white/75 mt-1">
                {formData.email || "Partner email address"}
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                {formData.role && (
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10">
                    {formData.role}
                  </span>
                )}

                {formData.isVerified && (
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-100">
                    ✓ Verified
                  </span>
                )}

                {formData.agreementSigned && (
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10">
                    Agreement Signed
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN FORM */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* PERSONAL INFORMATION */}
          <section className="p-6 md:p-8">
            <SectionHeader
              number="01"
              title="Personal Information"
              description="Basic information about the partner."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
              <Input
                label="First Name *"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                error={errors.firstName}
              />

              <Input
                label="Last Name *"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                error={errors.lastName}
              />

              <Input
                label="Email *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                error={errors.email}
              />

              <Select
                label="Gender *"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={["Male", "Female", "Other"]}
                placeholder="Select gender"
                error={errors.gender}
              />
            </div>
          </section>

          <Divider />

          {/* COMPANY INFORMATION */}
          <section className="p-6 md:p-8">
            <SectionHeader
              number="02"
              title="Company Information"
              description="Define the partner's company and role."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
              <Select
                label="Company *"
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                options={companies.map((c) => c.companyName)}
                placeholder="Select company"
                error={errors.companyId}
              />

              <Select
                label="Role *"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={roles}
                placeholder="Select role"
                error={errors.role}
              />
            </div>
          </section>

          <Divider />

          {/* LOCATION */}
          <section className="p-6 md:p-8">
            <SectionHeader
              number="03"
              title="Location"
              description="Partner's address and location details."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
              <div className="md:col-span-2">
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                />
              </div>

              <Input
                label="Country *"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter country"
                error={errors.country}
              />

              <Input
                label="City *"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                error={errors.city}
              />

              <Input
                label="ZIP Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Enter ZIP code"
              />
            </div>
          </section>

          <Divider />

          {/* BUSINESS RELATIONSHIP */}
          <section className="p-6 md:p-8">
            <SectionHeader
              number="04"
              title="Business Relationship"
              description="Manage partner status, verification and agreement."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
              <Select
                label="Status *"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={["Active", "Inactive", "Pending"]}
                placeholder="Select status"
                error={errors.status}
              />

              <Select
                label="Verification *"
                name="isVerified"
                value={formData.isVerified.toString()}
                onChange={handleChange}
                options={["true", "false"]}
                placeholder="Select verification"
                error={errors.isVerified}
              />

              <Select
                label="Agreement Signed *"
                name="agreementSigned"
                value={formData.agreementSigned.toString()}
                onChange={handleChange}
                options={["true", "false"]}
                placeholder="Select agreement status"
                error={errors.agreementSigned}
              />

              <Input
                label="Tax ID"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                placeholder="Enter tax ID"
              />

              <div className="md:col-span-2">
                <Input
                  label="Agreement Document URL"
                  name="agreementDocument"
                  value={formData.agreementDocument}
                  onChange={handleChange}
                  placeholder="Enter agreement document URL"
                />
              </div>
            </div>
          </section>

          <Divider />

          {/* RECORD INFORMATION */}
          <section className="p-6 md:p-8">
            <SectionHeader
              number="05"
              title="Record Information"
              description="System-generated partner information."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
              <ReadonlyField
                label="Created At"
                value={new Date(formData.createdAt).toLocaleString()}
              />

              {editingPartner && (
                <ReadonlyField
                  label="Updated At"
                  value={
                    formData.updatedAt
                      ? new Date(formData.updatedAt).toLocaleString()
                      : "Not updated yet"
                  }
                />
              )}
            </div>
          </section>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 px-6 md:px-8 py-6 border-t border-gray-100 bg-gray-50/60">
            <button
              type="button"
              onClick={() => navigate(returnPath || "/partner")}
              className="text-sm font-medium text-gray-500 hover:text-[#4D44B5] transition-colors"
            >
              Cancel and go back
            </button>

            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                type="submit"
                text={editingPartner ? "Update Partner" : "Create Partner"}
                hasBackground={true}
                bgColor="#4D44B5"
                className="text-white px-7 w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const SectionHeader = ({ number, title, description }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#F0EEFF] text-[#4D44B5] flex items-center justify-center text-xs font-bold">
        {number}
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#303972]">
          {title}
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
};

const Divider = () => (
  <div className="border-t border-gray-100" />
);

export default PartnerForm;