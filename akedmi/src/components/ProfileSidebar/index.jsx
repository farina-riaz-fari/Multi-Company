
import { useState } from "react";
import ProfileGroup from "../ProfileGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPlus,
  faUser,
  faXmark,
  faUtensils,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

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

  const SectionHeading = ({ title, subtitle, action }) => (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h3 className="text-lg font-bold text-[#303972]">{title}</h3>
        {subtitle && (
          <p className="text-xs text-[#A098AE] mt-1">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );

  const ViewMore = () => (
    <button className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl bg-[#4D44B5]/10 text-[#4D44B5] text-sm font-semibold hover:bg-[#4D44B5]/15 transition-colors">
      View More
      <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
    </button>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="xl:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-[#4D44B5] text-white shadow-lg hover:bg-[#40389B] transition-colors"
        >
          <FontAwesomeIcon
            icon={isOpen ? faXmark : faUser}
            className="text-lg"
          />
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } xl:hidden`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[90%] sm:w-[70%] md:w-[50%] xl:w-full bg-[#F8F8FC] border-l border-[#E9E7F3] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } xl:translate-x-0 xl:static`}
      >
        <div className="h-full overflow-y-auto">
          <div className="flex flex-col gap-7 p-4 sm:p-6">

            {/* Profile */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#EEEEF5]">
              <ProfileGroup />
            </div>

            {/* Recent Students */}
            <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#EEEEF5]">
              <SectionHeading
                title="Recent Students"
                subtitle="You have 456 students"
                action={
                  <button
                    aria-label="Add student"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#4D44B5] text-white hover:bg-[#40389B] transition-colors"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                }
              />

              <div className="flex flex-col gap-4">
                {students.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 shrink-0 rounded-full bg-[#EAE7FA] flex items-center justify-center text-[#4D44B5] font-bold">
                        {student.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#303972] truncate">
                          {student.name}
                        </p>
                        <p className="text-xs text-[#A098AE] mt-1">
                          {student.className}
                        </p>
                      </div>
                    </div>

                    <button
                      aria-label={`Message ${student.name}`}
                      className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                        student.active
                          ? "bg-[#4D44B5] text-white"
                          : "bg-[#F2F1F8] text-[#A098AE] hover:bg-[#EAE7FA]"
                      }`}
                    >
                      <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>

              <ViewMore />
            </section>

            {/* Messages */}
            <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#EEEEF5]">
              <SectionHeading
                title="Messages"
                subtitle="Your recent conversations"
              />

              <div className="flex flex-col">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 py-4 ${
                      index !== 0 ? "border-t border-[#EEEEF5]" : ""
                    }`}
                  >
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#EAE7FA] flex items-center justify-center text-[#4D44B5] font-bold">
                      SW
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-[#303972] truncate">
                          {msg.name}
                        </p>
                        <span className="text-[10px] text-[#A098AE] shrink-0">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#A098AE] mt-1 truncate">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <ViewMore />
            </section>

            {/* Current Foods Menu */}
            <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#EEEEF5]">
              <SectionHeading
                title="Current Foods Menu"
                subtitle="Today's available menu"
              />

              <div className="flex flex-col gap-4">
                {foodItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F7FC] border border-[#EEEEF5]"
                  >
                    <div className="w-16 h-16 shrink-0 rounded-xl bg-[#EAE7FA] flex items-center justify-center text-[#4D44B5]">
                      <FontAwesomeIcon
                        icon={faUtensils}
                        className="text-xl"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#303972]">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#A098AE] mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <ViewMore />
            </section>

          </div>
        </div>
      </aside>
    </>
  );
};

export default ProfileSidebar;
