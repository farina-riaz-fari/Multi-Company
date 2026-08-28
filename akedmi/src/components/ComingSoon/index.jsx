import React from "react";
import { FaTools } from "react-icons/fa";

const ComingSoon = ({ title }) => {
  return (
    <div className="min-h-screen bg-[#F3F4FF] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-[#F3F4FF] rounded-full flex items-center justify-center mx-auto mb-6">
          <FaTools className="text-3xl text-[#4D44B5]" />
        </div>

        <h1 className="text-3xl font-bold text-[#303972] mb-3">
          {title}
        </h1>

        <p className="text-gray-500 text-base leading-6">
          We're currently working on this section. This feature will be
          available in a future update.
        </p>

        <div className="mt-6 inline-block bg-[#4D44B5] text-white px-6 py-3 rounded-lg font-medium">
          Coming Soon
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;

