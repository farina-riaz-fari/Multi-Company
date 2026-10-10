import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaRegBell,
  FaCheck,
  FaCheckDouble,
  FaRegClock,
} from "react-icons/fa";
import { PiGearBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Welcome to Multi-Company",
    message: "Your dashboard is ready to use.",
    time: "Just now",
    read: false,
    type: "system",
  },
  {
    id: 2,
    title: "Notification preferences",
    message: "You can manage notification preferences in Settings.",
    time: "Recently",
    read: false,
    type: "settings",
  },
];

const DROPDOWN_WIDTH = 360;
const VIEWPORT_PADDING = 16;

const ProfileGroup = ({ gap = "none" }) => {
  const navigate = useNavigate();

  const bellRef = useRef(null);
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState(
    INITIAL_NOTIFICATIONS
  );
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
  });

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications = notifications.filter((notification) =>
    activeFilter === "unread" ? !notification.read : true
  );

  const updateDropdownPosition = () => {
    if (!bellRef.current) return;

    const bellRect = bellRef.current.getBoundingClientRect();

    const dropdownWidth = Math.min(
      DROPDOWN_WIDTH,
      window.innerWidth - VIEWPORT_PADDING * 2
    );

    const left = Math.max(
      VIEWPORT_PADDING,
      Math.min(
        bellRect.right - dropdownWidth,
        window.innerWidth - dropdownWidth - VIEWPORT_PADDING
      )
    );

    setDropdownPosition({
      top: bellRect.bottom + 12,
      left,
    });
  };

  const handleToggleDropdown = () => {
    if (!isOpen) {
      updateDropdownPosition();
    }

    setIsOpen((previous) => !previous);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      const clickedBell = bellRef.current?.contains(event.target);
      const clickedDropdown = dropdownRef.current?.contains(event.target);

      if (!clickedBell && !clickedDropdown) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleViewportChange = () => {
      updateDropdownPosition();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [isOpen]);

  const handleMarkAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const notificationDropdown = isOpen
    ? createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: "fixed",
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: `min(${DROPDOWN_WIDTH}px, calc(100vw - ${
              VIEWPORT_PADDING * 2
            }px))`,
            zIndex: 9999,
          }}
          className="overflow-hidden rounded-xl border border-[#E7E5F5] bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-[#F0EFF7] px-4 py-4">
            <div>
              <h3 className="text-base font-bold text-[#303972]">
                Notifications
              </h3>
              <p className="mt-1 text-xs text-[#A098AE]">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${
                      unreadCount === 1 ? "" : "s"
                    }`
                  : "You're all caught up"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#4D44B5] transition hover:text-[#38308F] disabled:cursor-not-allowed disabled:text-gray-400"
            >
              <FaCheckDouble />
              Mark all read
            </button>
          </div>

          <div className="flex gap-2 border-b border-[#F0EFF7] px-4 py-3">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeFilter === "all"
                  ? "bg-[#4D44B5] text-white"
                  : "bg-[#F5F4FA] text-[#77718C] hover:bg-[#EDEBF8]"
              }`}
            >
              All ({notifications.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter("unread")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeFilter === "unread"
                  ? "bg-[#4D44B5] text-white"
                  : "bg-[#F5F4FA] text-[#77718C] hover:bg-[#EDEBF8]"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          <div className="max-h-[350px] overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 border-b border-[#F3F2F8] px-4 py-4 last:border-b-0 ${
                    notification.read ? "bg-white" : "bg-[#F8F7FF]"
                  }`}
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEECFF] text-[#4D44B5]">
                    <FaRegBell size={15} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-[#303972]">
                        {notification.title}
                      </h4>

                      {!notification.read && (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#4D44B5]" />
                      )}
                    </div>

                    <p className="mt-1 text-xs leading-5 text-[#77718C]">
                      {notification.message}
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1 text-[11px] text-[#A098AE]">
                        <FaRegClock size={10} />
                        {notification.time}
                      </span>

                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="flex items-center gap-1 text-[11px] font-semibold text-[#4D44B5] hover:text-[#38308F]"
                        >
                          <FaCheck size={10} />
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center px-5 py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0EEFF] text-[#4D44B5]">
                  <FaCheckDouble size={20} />
                </div>

                <h4 className="mt-3 text-sm font-semibold text-[#303972]">
                  No unread notifications
                </h4>

                <p className="mt-1 text-xs text-[#A098AE]">
                  You're all caught up. Check back later for updates.
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-[#F0EFF7] bg-[#FBFAFE] px-4 py-3">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate("/settings");
              }}
              className="w-full text-center text-xs font-semibold text-[#4D44B5] hover:text-[#38308F]"
            >
              Manage notification preferences
            </button>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <div className={`flex items-center justify-between ${gap}`}>
      <div className="flex flex-row gap-2">
        <div ref={bellRef}>
          <button
            type="button"
            onClick={handleToggleDropdown}
            aria-label="Notifications"
            aria-expanded={isOpen}
            className={`relative cursor-pointer rounded-full bg-white p-3 shadow transition-colors ${
              isOpen ? "ring-2 ring-[#4D44B5]/20" : "hover:bg-[#F7F6FC]"
            }`}
          >
            <FaRegBell className="text-[24px] text-[#A098AE]" />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4D44B5] px-1 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        </div>

        <button
          type="button"
          aria-label="Settings"
          className="rounded-full bg-white p-3 shadow transition-colors hover:bg-[#F7F6FC]"
          onClick={() => navigate("/settings")}
        >
          <PiGearBold className="text-[24px] text-[#A098AE]" />
        </button>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col items-end justify-center">
          <div className="text-md font-bold text-[#303972] sm:text-lg">
            Neil Sims
          </div>
          <div className="text-[12px] font-[400] text-[#A098AE] sm:text-[14px]">
            Admin
          </div>
        </div>

        <div className="h-12 w-12 rounded-full bg-[#C1BBEB] sm:h-14 sm:w-14" />
      </div>

      {notificationDropdown}
    </div>
  );
};

export default ProfileGroup;
