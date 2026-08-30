import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-1 bg-[#F3F4FF] p-4 sm:p-6 lg:p-8 2xl:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 lg:mt-0">
          <Navbar title="Settings" />
          <ProfileGroup gap="gap-10" />
        </div>

        <div className="mt-8 space-y-6">
          {/* Preferences */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#303972] mb-6">
              Preferences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CurrencySelect
                label="Currency"
                name="currency"
                formData={formData}
                setFormData={setFormData}
              />

              <div className="flex flex-col pb-6">
                <label className="text-[#303972] font-bold text-md sm:text-lg pb-4">
                  Date Format
                </label>

                <select
                  name="dateFormat"
                  value={formData.dateFormat}
                  onChange={handleChange}
                  className="bg-white w-full border border-[#C1BBEB] text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 block py-3 px-4"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div className="flex flex-col pb-6">
                <label className="text-[#303972] font-bold text-md sm:text-lg pb-4">
                  Time Format
                </label>

                <select
                  name="timeFormat"
                  value={formData.timeFormat}
                  onChange={handleChange}
                  className="bg-white w-full border border-[#C1BBEB] text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 block py-3 px-4"
                >
                  <option value="12-hour">12-hour</option>
                  <option value="24-hour">24-hour</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                text="Save Settings"
                type="button"
                onClick={handleSave}
                hasBackground={true}
                className="!w-auto px-8"
              />

              {saved && (
                <span className="text-green-600 font-medium">
                  Settings saved successfully.
                </span>
              )}
            </div>
          </div>

          {/* Account */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#303972] mb-6">
              Account
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[#303972] font-semibold">Account Settings</p>
                <p className="text-[#A098AE] text-sm mt-1">
                  Manage your application account.
                </p>
              </div>

              <Button
                text="Logout"
                type="button"
                onClick={handleLogout}
                hasBackground={true}
                className="!w-auto px-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;