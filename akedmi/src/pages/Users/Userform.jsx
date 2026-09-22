import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CompanyContext } from "../../store/CompanyContext";
import { v4 as uuidv4 } from "uuid";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import {
  Input,
  ReadonlyField,
  Select,
} from "../Partner/CommonComponent/PartnerComponent";
import UserContext from "../../store/UserContext";

const UserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingUser = location.state?.student;

  const { addUser, updateUser } = useContext(UserContext);
  const { companies } = useContext(CompanyContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    dateOfBirth: "",
    gender: "",
    companyId: "",
    role: "",
    dateJoined: "",
    status: "Active",
    isVerified: true,
    userId: "",
    twoFactorEnabled: true,
    createdAt: "",
    updatedAt: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const now = new Date().toISOString();

    if (editingUser) {
      setFormData({
        ...editingUser,
        confirmPassword: editingUser.password,
        profilePicture: editingUser.profilePicture || null,
        createdAt: editingUser.createdAt || now,
        updatedAt: editingUser.updatedAt || now,
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        createdAt: now,
        updatedAt: "",
      }));
    }
  }, [editingUser]);

  const handleChange = useCallback(
    (e) => {
      const { name, value, type } = e.target;

      if (type === "checkbox") {
        setFormData((prev) => ({
          ...prev,
          [name]: e.target.checked,
        }));
      } else if (type === "file") {
        const file = e.target.files?.[0] ?? null;

        setFormData((prev) => ({
          ...prev,
          [name]: file,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }

      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.companyId) {
      newErrors.companyId = "Company is required";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    if (!formData.dateJoined) {
      newErrors.dateJoined = "Date joined is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    return newErrors;
  };

  const scrollToError = (formErrors) => {
    const firstErrorField = Object.keys(formErrors)[0];

    if (!firstErrorField) return;

    const element = document.getElementsByName(firstErrorField)[0];

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element.focus?.();
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      scrollToError(validationErrors);
      return;
    }

    setErrors({});

    const now = new Date().toISOString();
    const finalUserId = formData.userId || uuidv4();

    let profilePictureBase64 = null;

    if (formData.profilePicture instanceof File) {
      profilePictureBase64 = await convertToBase64(
        formData.profilePicture
      );
    } else if (typeof formData.profilePicture === "string") {
      profilePictureBase64 = formData.profilePicture;
    }

    const userData = {
      ...formData,
      profilePicture: profilePictureBase64,
      userId: finalUserId,
      createdAt: formData.createdAt || now,
      updatedAt: now,
    };

    editingUser ? updateUser(userData) : addUser(userData);

    navigate("/users");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] ?? null;

    setFormData((prev) => ({
      ...prev,
      profilePicture: file,
    }));
  };

  const getProfilePreview = () => {
    if (!formData.profilePicture) return null;

    if (typeof formData.profilePicture === "string") {
      return formData.profilePicture;
    }

    return URL.createObjectURL(formData.profilePicture);
  };

  const SectionTitle = ({ title, description }) => (
    <div className="mb-5">
      <h2 className="text-[#303972] text-lg font-bold">
        {title}
      </h2>

      <p className="text-[#9699AB] text-xs mt-1">
        {description}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#F5F6FA]">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8">
        {/* NAVBAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <Navbar
            title={editingUser ? "Edit User" : "Add New User"}
          />

          <ProfileGroup gap="gap-10" />
        </div>

        {/* PAGE INTRO */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#8E91A7] font-semibold">
                User Management
              </p>

              <h1 className="text-[#303972] text-2xl sm:text-3xl font-bold mt-1">
                {editingUser
                  ? "Update User Account"
                  : "Create User Account"}
              </h1>

              <p className="text-[#9295AA] text-sm mt-1">
                Manage profile information, company access, and
                account security.
              </p>
            </div>

            <span
              className={`w-fit px-3 py-1.5 rounded-full text-xs font-semibold ${
                formData.status === "Inactive"
                  ? "bg-gray-100 text-gray-600"
                  : formData.status === "Suspended"
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              ● {formData.status || "Active"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)] gap-6">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* PROFILE CARD */}
              <div className="bg-white border border-[#E6E7F0] rounded-2xl shadow-sm p-6">
                <div className="flex flex-col items-center text-center">
                  <label className="group relative w-32 h-32 rounded-full bg-[#F1F0FA] border-4 border-[#F7F7FB] shadow-md overflow-hidden cursor-pointer">
                    {getProfilePreview() ? (
                      <img
                        src={getProfilePreview()}
                        alt="User profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-[#4D44B5]">
                        <svg
                          className="w-11 h-11"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeWidth="1.5"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                          />
                        </svg>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {formData.profilePicture
                          ? "Change Photo"
                          : "Upload Photo"}
                      </span>
                    </div>

                    <input
                      type="file"
                      name="profilePicture"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>

                  <h2 className="text-[#303972] text-xl font-bold mt-4">
                    {formData.firstName || formData.lastName
                      ? `${formData.firstName} ${formData.lastName}`.trim()
                      : "New User"}
                  </h2>

                  <p className="text-[#9699AB] text-sm mt-1">
                    {formData.username || "username"}
                  </p>

                  <p className="text-[#9699AB] text-xs mt-1 break-all">
                    {formData.email || "email@example.com"}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#EEEEF4] space-y-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-[#A0A2B2]">
                      Role
                    </p>

                    <p className="text-sm font-semibold text-[#555A75] mt-1">
                      {formData.role || "Not assigned"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-[#A0A2B2]">
                      Company
                    </p>

                    <p className="text-sm font-semibold text-[#555A75] mt-1">
                      {formData.companyId || "Not assigned"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-[#A0A2B2]">
                      Joined
                    </p>

                    <p className="text-sm font-semibold text-[#555A75] mt-1">
                      {formData.dateJoined || "Not set"}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECURITY STATUS */}
              <div className="rounded-2xl bg-[#303972] p-6 text-white">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wide">
                      Account Security
                    </p>

                    <h3 className="font-bold text-lg mt-1">
                      Security Status
                    </h3>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">
                      Verified
                    </span>

                    <span className="text-xs font-semibold">
                      {formData.isVerified
                        ? "Enabled"
                        : "Disabled"}
                    </span>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">
                      Two-Factor
                    </span>

                    <span className="text-xs font-semibold">
                      {formData.twoFactorEnabled
                        ? "Enabled"
                        : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* PERSONAL INFORMATION */}
              <div className="bg-white border border-[#E6E7F0] rounded-2xl shadow-sm p-5 sm:p-7">
                <SectionTitle
                  title="Personal Information"
                  description="Basic identity and contact details."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
                  <Input
                    label="First Name *"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                  />

                  <Input
                    label="Last Name *"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                  />

                  <Input
                    label="Email *"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    error={errors.email}
                  />

                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />

                  <Input
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />

                  <Input
                    label="Date of Birth *"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    type="date"
                    error={errors.dateOfBirth}
                  />

                  <Select
                    label="Gender *"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    options={["Male", "Female", "Other"]}
                    error={errors.gender}
                  />
                </div>
              </div>

              {/* COMPANY & ACCESS */}
              <div className="bg-white border border-[#E6E7F0] rounded-2xl shadow-sm p-5 sm:p-7">
                <SectionTitle
                  title="Company & Access"
                  description="Configure where the user belongs and what role they have."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
                  <Select
                    label="Company *"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                    options={companies.map((c) => c.companyName)}
                    error={errors.companyId}
                  />

                  <Select
                    label="Role *"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    options={["Owner", "Partner", "Employee"]}
                    error={errors.role}
                  />

                  <Input
                    label="Date Joined *"
                    name="dateJoined"
                    value={formData.dateJoined}
                    onChange={handleChange}
                    type="date"
                    error={errors.dateJoined}
                  />

                  <Select
                    label="Status *"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={["Active", "Inactive", "Suspended"]}
                    error={errors.status}
                  />

                  <Select
                    label="Is Verified *"
                    name="isVerified"
                    value={formData.isVerified ? "Yes" : "No"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isVerified:
                          e.target.value === "Yes",
                      }))
                    }
                    options={["Yes", "No"]}
                    placeholder={false}
                  />
                </div>
              </div>

              {/* SECURITY & AUTHENTICATION */}
              <div className="bg-white border border-[#E6E7F0] rounded-2xl shadow-sm p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <SectionTitle
                    title="Security & Authentication"
                    description="Manage login credentials and account protection."
                  />

                  <div className="hidden sm:flex shrink-0 items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F4F3FC] text-[#4D44B5] text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4D44B5]" />
                    Protected
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
                  <Input
                    label="Password *"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    error={errors.password}
                  />

                  <Input
                    label="Confirm Password *"
                    name="confirmPassword"
                    value={formData.confirmPassword || ""}
                    onChange={handleChange}
                    type="password"
                    error={errors.confirmPassword}
                  />

                  <Select
                    label="Two-Factor Authentication *"
                    name="twoFactorEnabled"
                    value={
                      formData.twoFactorEnabled
                        ? "Yes"
                        : "No"
                    }
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        twoFactorEnabled:
                          e.target.value === "Yes",
                      }))
                    }
                    options={["Yes", "No"]}
                    placeholder={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RECORD + ACCOUNT OVERVIEW */}
          <div className="grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)] gap-6 mt-6">
            {/* RECORD INFORMATION */}
            <div className="bg-white border border-[#E6E7F0] rounded-2xl shadow-sm p-6">
              <SectionTitle
                title="Record Information"
                description="System-generated account information."
              />

              <div className="space-y-5">
                <ReadonlyField
                  label="Created At"
                  value={
                    formData.createdAt
                      ? new Date(
                          formData.createdAt
                        ).toLocaleString()
                      : "—"
                  }
                />

                {editingUser && (
                  <ReadonlyField
                    label="Updated At"
                    value={
                      formData.updatedAt
                        ? new Date(
                            formData.updatedAt
                          ).toLocaleString()
                        : "Not updated yet"
                    }
                  />
                )}
              </div>
            </div>

            {/* ACCOUNT OVERVIEW */}
            <div className="bg-white border border-[#E6E7F0] rounded-2xl shadow-sm p-6">
              <SectionTitle
                title="Account Overview"
                description="Current account configuration and access status."
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* STATUS */}
                <div className="rounded-xl bg-[#F7F7FC] border border-[#ECECF4] p-4">
                  <p className="text-[11px] uppercase tracking-wide text-[#9A9CAF]">
                    Status
                  </p>

                  <p
                    className={`text-sm font-semibold mt-2 ${
                      formData.status === "Inactive"
                        ? "text-gray-600"
                        : formData.status === "Suspended"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {formData.status || "Active"}
                  </p>
                </div>

                {/* VERIFICATION */}
                <div className="rounded-xl bg-[#F7F7FC] border border-[#ECECF4] p-4">
                  <p className="text-[11px] uppercase tracking-wide text-[#9A9CAF]">
                    Verification
                  </p>

                  <p className="text-sm font-semibold text-[#4D44B5] mt-2">
                    {formData.isVerified
                      ? "Verified"
                      : "Not Verified"}
                  </p>
                </div>

                {/* TWO FACTOR */}
                <div className="rounded-xl bg-[#F7F7FC] border border-[#ECECF4] p-4">
                  <p className="text-[11px] uppercase tracking-wide text-[#9A9CAF]">
                    Two-Factor
                  </p>

                  <p className="text-sm font-semibold text-[#4D44B5] mt-2">
                    {formData.twoFactorEnabled
                      ? "Enabled"
                      : "Disabled"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 pb-10">
            <p className="text-xs text-[#9699AB] text-center sm:text-left">
              Fields marked with * are required.
            </p>

            <div className="flex items-center gap-3">
              <Button
                text="Cancel"
                hasBorder={true}
                borderColor="#4D44B5"
                onClick={() => navigate("/users")}
                className="px-7 sm:px-10 whitespace-nowrap"
              />

              <Button
                type="submit"
                text={
                  editingUser
                    ? "Update User"
                    : "Create User"
                }
                hasBackground={true}
                bgColor="#4D44B5"
                className="text-white px-7 sm:px-10 whitespace-nowrap min-w-[140px]"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;