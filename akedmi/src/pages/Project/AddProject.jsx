import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiFolder,
  FiInfo,
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiPlus,
} from "react-icons/fi";

const AddProject = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Project created");

    navigate("/project");
  };

  return (
    <div className="min-h-screen bg-[#F7F7FB] p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#443B9A] via-[#5B52C7] to-[#7067D8] shadow-xl">
        <div className="relative px-5 py-7 sm:px-7 lg:px-9 lg:py-8">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-300/10 blur-3xl" />

          <div className="relative">
            <button
              type="button"
              onClick={() => navigate("/project")}
              className="mb-6 flex items-center gap-2 text-sm font-medium text-indigo-100 transition hover:text-white"
            >
              <FiArrowLeft size={17} />
              Back to Projects
            </button>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                <FiFolder size={25} />
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-200">
                  Project Workspace
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Create New Project
                </h1>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-indigo-100">
                  Add a new project and organize its timeline, budget, and
                  details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Project Information */}
        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-5 sm:px-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-[#5B52C7]">
              <FiInfo size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5B52C7]">
                01
              </p>

              <h2 className="mt-0.5 text-lg font-bold text-gray-900">
                Project Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the basic information for your project.
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Project Name
              </label>

              <input
                type="text"
                placeholder="e.g. Website Redesign"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Project Code
              </label>

              <input
                type="text"
                placeholder="e.g. PRJ-007"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Company
              </label>

              <select
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10"
              >
                <option value="">Select company</option>
                <option>Tech Solutions</option>
                <option>Digital Works</option>
                <option>Creative Hub</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Client
              </label>

              <input
                type="text"
                placeholder="Enter client name"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10"
              />
            </div>
          </div>
        </section>

        {/* Timeline & Budget */}
        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-5 sm:px-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiCalendar size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                02
              </p>

              <h2 className="mt-0.5 text-lg font-bold text-gray-900">
                Timeline & Budget
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Define the project schedule and financial details.
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-7">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Start Date
              </label>

              <input
                type="date"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Due Date
              </label>

              <input
                type="date"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Budget
              </label>

              <div className="relative">
                <FiDollarSign
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="number"
                  placeholder="0.00"
                  min="0"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Status
              </label>

              <select
                defaultValue="Planning"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10"
              >
                <option>Planning</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-5 sm:px-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <FiFileText size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                03
              </p>

              <h2 className="mt-0.5 text-lg font-bold text-gray-900">
                Project Details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add additional information about this project.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              rows="5"
              placeholder="Describe the project, its objectives, scope, and other relevant information..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10"
            />
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/project")}
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#5B52C7] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4F46B8] hover:shadow-md"
          >
            <FiPlus size={18} />
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;