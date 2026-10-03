import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCog,
  FaSlidersH,
  FaUserCircle,
  FaGlobe,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaSignOutAlt,
  FaChevronRight,
  FaBell,
  FaMoneyBillWave,
  FaProjectDiagram,
  FaBoxOpen,
} from "react-icons/fa";

import { AuthContext } from "../../store/signupAndLoginContext";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import Button from "../../components/Button";
import { CurrencySelect } from "../../components/CurrencySelect";
import {
  getSettingsFromDB,
  saveSettingsToDB,
} from "../../utils/settingsIndexedDB";

const Settings = () => {
  const { logoutAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currency: "PKR",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12-hour",
    notifications: {
      system: true,
      payroll: true,
      projects: true,
      lowStock: true,
    },
  });

  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("preferences");

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettingsFromDB();

      if (settings) {
        setFormData({
          currency: settings.currency || "PKR",
          dateFormat: settings.dateFormat || "DD/MM/YYYY",
          timeFormat: settings.timeFormat || "12-hour",
          notifications: {
            system: settings.notifications?.system ?? true,
            payroll: settings.notifications?.payroll ?? true,
            projects: settings.notifications?.projects ?? true,
            lowStock: settings.notifications?.lowStock ?? true,
          },
        });
      }
    };

    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleNotificationChange = (name) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: !prev.notifications[name],
      },
    }));

    setSaved(false);
  };

  const handleSave = async () => {
    await saveSettingsToDB(formData);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handleLogout = () => {
    logoutAuth();
    navigate("/");
  };

  const settingsItems = [
    {
      id: "preferences",
      label: "Preferences",
      description: "Regional and display settings",
      icon: FaSlidersH,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Manage application alerts",
      icon: FaBell,
    },
    {
      id: "account",
      label: "Account",
      description: "Manage your account",
      icon: FaUserCircle,
    },
  ];

  const notificationItems = [
    {
      id: "system",
      title: "System Notifications",
      description:
        "Receive important updates and general application alerts.",
      icon: FaBell,
    },
    {
      id: "payroll",
      title: "Payroll Notifications",
      description:
        "Receive reminders and updates related to payroll activity.",
      icon: FaMoneyBillWave,
    },
    {
      id: "projects",
      title: "Project Notifications",
      description:
        "Receive updates when project-related activity requires attention.",
      icon: FaProjectDiagram,
    },
    {
      id: "lowStock",
      title: "Low Stock Notifications",
      description:
        "Receive alerts when products reach a low-stock level.",
      icon: FaBoxOpen,
    },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#F7F7FC] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <Navbar title="Settings" />

          <p className="ml-1 mt-1 text-sm text-gray-400">
            Manage your application preferences and account
          </p>
        </div>

        <ProfileGroup gap="gap-8" />
      </div>

      {/* Settings Content */}
      <div className="mt-7 flex flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <aside className="shrink-0 lg:w-[270px]">
          <div className="rounded-2xl border border-[#6B63C7] bg-[#4D44B5] p-3 shadow-sm">
            <div className="mb-2 hidden items-center gap-3 px-3 py-4 lg:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                <FaCog size={16} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
                  Configuration
                </p>

                <h2 className="mt-0.5 text-sm font-semibold text-white">
                  Settings Center
                </h2>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto lg:flex-col">
              {settingsItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className={`flex w-full min-w-[190px] items-center gap-3 rounded-xl px-3 py-3 text-left transition-all lg:min-w-0 ${
                      isActive
                        ? "bg-white text-[#4D44B5] shadow-sm"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-[#F1EFFF] text-[#4D44B5]"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      <Icon size={14} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-semibold ${
                          isActive
                            ? "text-[#4D44B5]"
                            : "text-white"
                        }`}
                      >
                        {item.label}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-white/60">
                        {item.description}
                      </p>
                    </div>

                    <FaChevronRight
                      className={`hidden text-[9px] lg:block ${
                        isActive
                          ? "text-[#4D44B5]"
                          : "text-white/50"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Panel */}
        <main className="min-w-0 flex-1">
          {/* Preferences */}
          {activeSection === "preferences" && (
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-5 py-6 sm:px-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F1EFFF] text-[#4D44B5]">
                    <FaSlidersH size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Application Preferences
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-[#303972]">
                      Regional Preferences
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      Choose how dates, times, and currency are
                      displayed throughout the application.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Currency */}
                  <div className="rounded-xl border border-gray-100 bg-[#FAFAFD] p-5">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#4D44B5] shadow-sm">
                        <FaGlobe size={14} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#303972]">
                          Currency
                        </p>

                        <p className="mt-0.5 text-[11px] text-gray-400">
                          Default currency
                        </p>
                      </div>
                    </div>

                    <CurrencySelect
                      label="Currency"
                      name="currency"
                      formData={formData}
                      setFormData={(value) => {
                        setFormData(value);
                        setSaved(false);
                      }}
                    />
                  </div>

                  {/* Date */}
                  <div className="rounded-xl border border-gray-100 bg-[#FAFAFD] p-5">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#4D44B5] shadow-sm">
                        <FaCalendarAlt size={14} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#303972]">
                          Date Format
                        </p>

                        <p className="mt-0.5 text-[11px] text-gray-400">
                          How dates are displayed
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <select
                        name="dateFormat"
                        value={formData.dateFormat}
                        onChange={handleChange}
                        className="block h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-600 transition-all focus:border-[#4D44B5]/40 focus:outline-none focus:ring-4 focus:ring-[#4D44B5]/5"
                      >
                        <option value="DD/MM/YYYY">
                          DD/MM/YYYY
                        </option>

                        <option value="MM/DD/YYYY">
                          MM/DD/YYYY
                        </option>

                        <option value="YYYY-MM-DD">
                          YYYY-MM-DD
                        </option>
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="rounded-xl border border-gray-100 bg-[#FAFAFD] p-5 md:col-span-2">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#4D44B5] shadow-sm">
                          <FaClock size={14} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#303972]">
                            Time Format
                          </p>

                          <p className="mt-0.5 text-[11px] text-gray-400">
                            Choose how time is displayed
                          </p>
                        </div>
                      </div>

                      <div className="relative w-full sm:w-[220px]">
                        <select
                          name="timeFormat"
                          value={formData.timeFormat}
                          onChange={handleChange}
                          className="block h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-600 transition-all focus:border-[#4D44B5]/40 focus:outline-none focus:ring-4 focus:ring-[#4D44B5]/5"
                        >
                          <option value="12-hour">12-hour</option>
                          <option value="24-hour">24-hour</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Area */}
                <div className="mt-7 flex flex-col justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2">
                    {saved ? (
                      <>
                        <FaCheckCircle className="text-sm text-emerald-500" />

                        <span className="text-sm font-medium text-emerald-600">
                          Settings saved successfully
                        </span>
                      </>
                    ) : (
                      <p className="text-xs text-gray-400">
                        Changes are stored locally for this application.
                      </p>
                    )}
                  </div>

                  <Button
                    text="Save Settings"
                    type="button"
                    onClick={handleSave}
                    hasBackground={true}
                    className="!h-11 !w-auto px-7"
                  />
                </div>
              </div>

              <div className="h-1 bg-gradient-to-r from-[#4D44B5] via-[#746BDA] to-[#9B95EA]" />
            </div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-5 py-6 sm:px-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F1EFFF] text-[#4D44B5]">
                    <FaBell size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Application Alerts
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-[#303972]">
                      Notifications
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      Choose which types of application notifications you
                      want to receive.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="space-y-3">
                  {notificationItems.map((item) => {
                    const Icon = item.icon;
                    const enabled = formData.notifications[item.id];

                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col gap-4 rounded-2xl border p-4 transition-all sm:flex-row sm:items-center sm:justify-between sm:p-5 ${
                          enabled
                            ? "border-[#E4E1FF] bg-[#FAFAFD]"
                            : "border-gray-100 bg-white"
                        }`}
                      >
                        <div className="flex min-w-0 items-start gap-4">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
                              enabled
                                ? "bg-[#F1EFFF] text-[#4D44B5]"
                                : "bg-gray-50 text-gray-400"
                            }`}
                          >
                            <Icon size={15} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#303972]">
                              {item.title}
                            </p>

                            <p className="mt-1 max-w-xl text-xs leading-5 text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleNotificationChange(item.id)
                          }
                          aria-pressed={enabled}
                          className={`relative h-7 w-12 shrink-0 rounded-full transition-all ${
                            enabled
                              ? "bg-[#5B52C7]"
                              : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
                              enabled ? "left-6" : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Save Area */}
                <div className="mt-7 flex flex-col justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2">
                    {saved ? (
                      <>
                        <FaCheckCircle className="text-sm text-emerald-500" />

                        <span className="text-sm font-medium text-emerald-600">
                          Notification settings saved
                        </span>
                      </>
                    ) : (
                      <p className="text-xs text-gray-400">
                        Notification preferences are stored locally.
                      </p>
                    )}
                  </div>

                  <Button
                    text="Save Notifications"
                    type="button"
                    onClick={handleSave}
                    hasBackground={true}
                    className="!h-11 !w-auto px-7"
                  />
                </div>
              </div>

              <div className="h-1 bg-gradient-to-r from-[#4D44B5] via-[#746BDA] to-[#9B95EA]" />
            </div>
          )}

          {/* Account */}
          {activeSection === "account" && (
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-5 py-6 sm:px-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F1EFFF] text-[#4D44B5]">
                    <FaUserCircle size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Account Management
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-[#303972]">
                      Account
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      Manage your current application session.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="rounded-2xl border border-gray-100 bg-[#FAFAFD] p-5 sm:p-6">
                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm">
                        <FaUserCircle size={19} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#303972]">
                          Account Settings
                        </p>

                        <p className="mt-1 max-w-md text-sm text-gray-400">
                          Sign out from the current application session.
                          You can log in again whenever you need to access
                          the application.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-6 text-sm font-semibold text-red-500 transition-all hover:bg-red-500 hover:text-white"
                    >
                      <FaSignOutAlt size={13} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-1 bg-gradient-to-r from-[#4D44B5] via-[#746BDA] to-[#9B95EA]" />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;