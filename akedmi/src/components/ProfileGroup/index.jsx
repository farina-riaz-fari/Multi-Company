import { FaRegBell } from "react-icons/fa";
import { PiGearBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const ProfileGroup = ({ gap = "none" }) => {
  const navigate = useNavigate();
  return (
    <div className={`flex justify-between items-center ${gap}`}>
      <div className="flex flex-row gap-2">
        <div className="p-3 rounded-full shadow bg-white">
          <FaRegBell className="text-[24px] sm:text-[24px]  text-[#A098AE]" />
        </div>
        <div
          className="p-3 rounded-full shadow bg-white cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          <PiGearBold className="text-[24px] sm:text-[24px] text-[#A098AE]" />
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col justify-center items-end">
          <div className="text-md sm:text-lg font-bold text-[#303972]">
            Neil Sims
          </div>
          <div className="text-[12px] sm:text-[14px] font-[400] text-[#A098AE]">
            Admin
          </div>
        </div>
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C1BBEB]" />
      </div>
    </div>
  );
};

export default ProfileGroup;
