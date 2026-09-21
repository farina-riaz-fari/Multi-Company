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
  });

  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] =
    useState("preferences");

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettingsFromDB();

      if (settings) {
        setFormData({
          currency: settings.currency || "PKR",
          dateFormat: settings.dateFormat || "DD/MM/YYYY",
          timeFormat: settings.timeFormat || "12-hour",
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
      id: "account",
      label: "Account",
      description: "Manage your account",
      icon: FaUserCircle,
    },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#F7F7FC] px-4 sm:px-6 lg:px-10 py-5 sm:py-7 lg:py-9">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <Navbar title="Settings" />

          <p className="text-sm text-gray-400 mt-1 ml-1">
            Manage your application preferences and account
          </p>
        </div>

        <ProfileGroup gap="gap-8" />
      </div>

      {/* Settings Content */}
      <div className="mt-7 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-[270px] shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
            <div className="hidden lg:flex items-center gap-3 px-3 py-4 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center">
                <FaCog size={16} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                  Configuration
                </p>

                <h2 className="text-sm font-semibold text-[#303972] mt-0.5">
                  Settings Center
                </h2>
              </div>
            </div>

            <div className="flex lg:flex-col gap-2 overflow-x-auto">
              {settingsItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setActiveSection(item.id)
                    }
                    className={`min-w-[190px] lg:min-w-0 w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                      isActive
                        ? "bg-[#F2F0FF] text-[#4D44B5]"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-white text-[#4D44B5]"
                          : "bg-gray-50 text-gray-400"
                      }`}
                    >
                      <Icon size={14} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-semibold ${
                          isActive
                            ? "text-[#4D44B5]"
                            : "text-gray-600"
                        }`}
                      >
                        {item.label}
                      </p>

                      <p className="text-[10px] text-gray-400 mt-0.5 truncate">
                        {item.description}
                      </p>
                    </div>

                    <FaChevronRight
                      className={`hidden lg:block text-[9px] ${
                        isActive
                          ? "text-[#4D44B5]"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 min-w-0">
          {activeSection === "preferences" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Section Header */}
              <div className="px-5 sm:px-7 py-6 border-b border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center shrink-0">
                    <FaSlidersH size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                      Application Preferences
                    </p>

                    <h2 className="text-xl font-semibold text-[#303972] mt-1">
                      Regional Preferences
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                      Choose how dates, times, and currency are
                      displayed throughout the application.
                    </p>
                  </div>
                </div>
              </div>

              {/* Preference Fields */}
              <div className="p-5 sm:p-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Currency */}
                  <div className="rounded-xl border border-gray-100 bg-[#FAFAFD] p-5">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-lg bg-white text-[#4D44B5] flex items-center justify-center shadow-sm">
                        <FaGlobe size={14} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#303972]">
                          Currency
                        </p>

                        <p className="text-[11px] text-gray-400 mt-0.5">
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
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-lg bg-white text-[#4D44B5] flex items-center justify-center shadow-sm">
                        <FaCalendarAlt size={14} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#303972]">
                          Date Format
                        </p>

                        <p className="text-[11px] text-gray-400 mt-0.5">
                          How dates are displayed
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <select
                        name="dateFormat"
                        value={formData.dateFormat}
                        onChange={handleChange}
                        className="bg-white w-full h-12 border border-gray-200 text-gray-600 text-sm rounded-xl focus:outline-none focus:border-[#4D44B5]/40 focus:ring-4 focus:ring-[#4D44B5]/5 block py-3 px-4 pr-10 appearance-none transition-all"
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
                          className="w-4 h-4"
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
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white text-[#4D44B5] flex items-center justify-center shadow-sm">
                          <FaClock size={14} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#303972]">
                            Time Format
                          </p>

                          <p className="text-[11px] text-gray-400 mt-0.5">
                            Choose how time is displayed
                          </p>
                        </div>
                      </div>

                      <div className="relative w-full sm:w-[220px]">
                        <select
                          name="timeFormat"
                          value={formData.timeFormat}
                          onChange={handleChange}
                          className="bg-white w-full h-12 border border-gray-200 text-gray-600 text-sm rounded-xl focus:outline-none focus:border-[#4D44B5]/40 focus:ring-4 focus:ring-[#4D44B5]/5 block py-3 px-4 pr-10 appearance-none transition-all"
                        >
                          <option value="12-hour">
                            12-hour
                          </option>
                          <option value="24-hour">
                            24-hour
                          </option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                          <svg
                            className="w-4 h-4"
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
                <div className="mt-7 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {saved && (
                      <>
                        <FaCheckCircle className="text-emerald-500 text-sm" />

                        <span className="text-sm font-medium text-emerald-600">
                          Settings saved successfully
                        </span>
                      </>
                    )}

                    {!saved && (
                      <p className="text-xs text-gray-400">
                        Changes are stored locally for this
                        application.
                      </p>
                    )}
                  </div>

                  <Button
                    text="Save Settings"
                    type="button"
                    onClick={handleSave}
                    hasBackground={true}
                    className="!w-auto px-7 h-11"
                  />
                </div>
              </div>

              <div className="h-1 bg-gradient-to-r from-[#4D44B5] via-[#746BDA] to-[#9B95EA]" />
            </div>
          )}

          {activeSection === "account" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Account Header */}
              <div className="px-5 sm:px-7 py-6 border-b border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F1EFFF] text-[#4D44B5] flex items-center justify-center shrink-0">
                    <FaUserCircle size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                      Account Management
                    </p>

                    <h2 className="text-xl font-semibold text-[#303972] mt-1">
                      Account
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                      Manage your current application session.
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Content */}
              <div className="p-5 sm:p-7">
                <div className="rounded-2xl border border-gray-100 bg-[#FAFAFD] p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-white text-gray-400 flex items-center justify-center shadow-sm">
                        <FaUserCircle size={19} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#303972]">
                          Account Settings
                        </p>

                        <p className="text-sm text-gray-400 mt-1 max-w-md">
                          Sign out from the current application
                          session. You can log in again whenever
                          you need to access the application.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="h-11 px-6 rounded-xl bg-red-50 text-red-500 border border-red-100 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-red-500 hover:text-white transition-all shrink-0"
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