import { useState } from "react";
import ProfileGroup from "../ProfileGroup";
import { FaTimes, FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const ProfileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const students = [
    { name: "Samantha William", className: "Class VII A", active: false },
    { name: "Tony Soap", className: "Class VII A", active: true },
    { name: "Karen Hope", className: "Class VII A", active: false },
    { name: "Jordan Nico", className: "Class VII B", active: false },
    { name: "Nadila Adja", className: "Class VII B", active: false },
  ];

  const messages = [
    {
      name: "Samantha William",
      message: "Lorem ipsum dolor sit amet...",
      time: "12:45 PM",
    },
    {
      name: "Samantha William",
      message: "Lorem ipsum dolor sit amet...",
      time: "12:45 PM",
    },
    {
      name: "Samantha William",
      message: "Lorem ipsum dolor sit amet...",
      time: "12:45 PM",
    },
    {
      name: "Samantha William",
      message: "Lorem ipsum dolor sit amet...",
      time: "12:45 PM",
    },
  ];

  const foodItems = [
    {
      title: "Beef Steak with Fried Potato",
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      title: "Pancake with Honey",
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      title: "Japanese Beef Ramen",
      description: "Lorem ipsum dolor sit amet...",
    },
  ];

  return (
    <>
      <div className="xl:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-white bg-[#C1BBEB] p-2 rounded-full"
        >
          {isOpen ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FaUser size={20} />
          )}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-30 visible" : "opacity-0 invisible"
        } lg:hidden`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-[90%] sm:w-[70%] md:w-[50%] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } xl:translate-x-0 xl:static xl:w-full`}
      >
        <div className="overflow-y-auto h-full">
          <div className="bg-white flex flex-col justify-center p-4 sm:p-8">
            <ProfileGroup />
            <div className="flex justify-between items-center w-full pt-10">
              <div className="w-full gap-10 flex flex-row items-center">
                <div className="flex flex-row w-full">
                  <div className="flex flex-col justify-center items-start">
                    <div className="text-lg sm:text-xl font-[700] text-[#303972]">
                      Recent Students
                    </div>
                    <div className="text-[12px] sm:text-[14px] font-[400] text-[#A098AE]">
                      You have 456 Students
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4 flex items-center justify-center bg-[#4D44B5] rounded-full">
                  <FontAwesomeIcon icon={faPlus} className="text-white text-[14px]" />
                </div>
              </div>
            </div>

            {students.map((student, index) => (
              <div
                key={index}
                className="flex justify-between items-center w-full pt-6"
              >
                <div className="w-full gap-10 flex flex-row items-center">
                  <div className="flex flex-row w-full">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C1BBEB]" />
                    <div className="flex flex-col justify-center items-start ps-2 sm:ps-4">
                      <div className="text-md sm:text-lg font-bold text-[#303972]">
                        {student.name}
                      </div>
                      <div className="text-[12px] sm:text-[14px] text-[#A098AE]">
                        {student.className}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-2 sm:p-4 border-2 rounded-full ${
                      student.active
                        ? "bg-[#4D44B5] border-[#4D44B5]"
                        : "border-[#A098AE]"
                    }`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 4.00011H4C3.20435 4.00011 2.44129 4.31619 1.87868 4.87879C1.31607 5.4414 1 6.20446 1 7.00011V17.0001C1 17.7958 1.31607 18.5588 1.87868 19.1214C2.44129 19.684 3.20435 20.0001 4 20.0001H20C20.7956 20.0001 21.5587 19.684 22.1213 19.1214C22.6839 18.5588 23 17.7958 23 17.0001V7.00011C23 6.20446 22.6839 5.4414 22.1213 4.87879C21.5587 4.31619 20.7956 4.00011 20 4.00011ZM21 16.7501L16.1 12.3501L21 8.92011V16.7501ZM3 8.92011L7.9 12.3501L3 16.7501V8.92011ZM9.58 13.5301L11.43 14.8201C11.5974 14.9362 11.7963 14.9985 12 14.9985C12.2037 14.9985 12.4026 14.9362 12.57 14.8201L14.42 13.5301L19.42 18.0001H4.6L9.58 13.5301ZM4 6.00011H20C20.1857 6.0016 20.3673 6.05478 20.5245 6.15369C20.6817 6.2526 20.8083 6.39333 20.89 6.56011L12 12.7801L3.11 6.56011C3.19171 6.39333 3.31826 6.2526 3.47545 6.15369C3.63265 6.05478 3.81428 6.0016 4 6.00011Z"
                        fill={student.active ? "white" : "#A098AE"}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col w-full pt-10 pb-12">
              <button className="flex flex-row text-center text-md sm:text-lg font-bold justify-center items-center w-full gap-4 bg-[#4D44B51A] text-[#4D44B5] p-4 rounded-full">
                View More
              </button>
            </div>

            <div className="flex flex-col w-full pb-6">
              <div className="text-xl font-[800] text-[#303972] text-start pb-6">
                Messages
              </div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`w-full flex flex-row justify-between border-b-2 border-[#A098AE] ${
                    index !== 0 ? "pt-6" : ""
                  }`}
                >
                  <div className="flex flex-row items-center pb-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C1BBEB]" />
                    <div className="flex flex-col justify-center items-start ps-2 sm:ps-4">
                      <div className="text-md sm:text-lg font-bold text-[#303972]">
                        {msg.name}
                      </div>
                      <div className="text-[12px] sm:text-[14px] font-[400] text-[#A098AE]">
                        {msg.message}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-[#A098AE]">
                    {msg.time}
                  </div>
                </div>
              ))}

              <div className="flex flex-col w-full pt-8 pb-10">
                <button className="flex flex-row text-center text-md sm:text-lg font-bold justify-center items-center w-full gap-4 bg-[#4D44B51A] text-[#4D44B5] p-4 rounded-full">
                  View More
                </button>
              </div>
            </div>

            <div className="flex flex-col w-full pb-6">
              <div className="text-xl font-[800] text-[#363B64] text-start pb-6">
                Current Foods Menu
              </div>
              {foodItems.map((item, index) => (
                <div
                  key={index}
                  className={`w-full ${index === 0 ? "pt-4" : "pt-8"}`}
                >
                  <div className="p-20 bg-[#C1BBEB] rounded-2xl" />
                  <div className="flex justify-start flex-col items-start pt-6">
                    <div className="text-md sm:text-lg font-bold text-[#363B64]">
                      {item.title}
                    </div>
                    <div className="text-[12px] sm:text-[14px] font-[400] text-[#A098AE]">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col w-full pt-10 pb-10">
                <button className="flex flex-row text-center text-md sm:text-lg font-bold justify-center items-center w-full gap-4 bg-[#4D44B51A] text-[#4D44B5] p-4 rounded-full">
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
