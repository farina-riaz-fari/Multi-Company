import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiMoreVertical,
  FiFolder,
  FiClock,
  FiCheckCircle,
  FiActivity,
  FiChevronDown,
} from "react-icons/fi";

const projectsData = [
  {
    id: 1,
    name: "Website Redesign",
    code: "PRJ-001",
    company: "Tech Solutions",
    client: "Nova Technologies",
    startDate: "Jan 08, 2026",
    dueDate: "Mar 30, 2026",
    budget: "$18,500",
    progress: 78,
    status: "In Progress",
  },
  {
    id: 2,
    name: "Mobile Banking App",
    code: "PRJ-002",
    company: "Digital Works",
    client: "Prime Bank",
    startDate: "Feb 01, 2026",
    dueDate: "Jun 15, 2026",
    budget: "$42,000",
    progress: 54,
    status: "In Progress",
  },
  {
    id: 3,
    name: "CRM Implementation",
    code: "PRJ-003",
    company: "Creative Hub",
    client: "Vertex Group",
    startDate: "Jan 15, 2026",
    dueDate: "Apr 20, 2026",
    budget: "$25,800",
    progress: 91,
    status: "In Progress",
  },
  {
    id: 4,
    name: "Inventory System",
    code: "PRJ-004",
    company: "Tech Solutions",
    client: "Alpha Retail",
    startDate: "Nov 10, 2025",
    dueDate: "Feb 28, 2026",
    budget: "$15,200",
    progress: 100,
    status: "Completed",
  },
  {
    id: 5,
    name: "Marketing Portal",
    code: "PRJ-005",
    company: "Digital Works",
    client: "Bright Media",
    startDate: "Mar 05, 2026",
    dueDate: "May 25, 2026",
    budget: "$11,750",
    progress: 32,
    status: "Planning",
  },
  {
    id: 6,
    name: "HR Management System",
    code: "PRJ-006",
    company: "Creative Hub",
    client: "People First",
    startDate: "Feb 20, 2026",
    dueDate: "Jul 10, 2026",
    budget: "$31,500",
    progress: 18,
    status: "Planning",
  },
];

const Project = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");

  const totalProjects = projectsData.length;
  const activeProjects = projectsData.filter(
    (project) => project.status === "In Progress"
  ).length;
  const completedProjects = projectsData.filter(
    (project) => project.status === "Completed"
  ).length;
  const planningProjects = projectsData.filter(
    (project) => project.status === "Planning"
  ).length;

  const companies = [...new Set(projectsData.map((project) => project.company))];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.code.toLowerCase().includes(search.toLowerCase()) ||
        project.client.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      const matchesCompany =
        companyFilter === "All" || project.company === companyFilter;

      return matchesSearch && matchesStatus && matchesCompany;
    });
  }, [search, statusFilter, companyFilter]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Planning":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getProgressStyle = (progress) => {
    if (progress === 100) {
      return "bg-emerald-500";
    }

    if (progress >= 70) {
      return "bg-indigo-500";
    }

    if (progress >= 40) {
      return "bg-blue-500";
    }

    return "bg-amber-500";
  };

  return (
    <div className="min-h-screen bg-[#F7F7FB] p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#443B9A] via-[#5B52C7] to-[#7067D8] shadow-xl">
        <div className="relative px-5 py-7 sm:px-7 lg:px-9 lg:py-8">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-300/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                  <FiFolder size={20} />
                </div>

                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-100">
                  Project Workspace
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Project Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
                Track projects, monitor progress, manage deadlines, and keep
                your teams aligned from one place.
              </p>
            </div>

            <button
              onClick={() => navigate("/add-project")}
              className="flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#5B52C7] shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
            >
              <FiPlus size={18} />
              Add Project
            </button>
          </div>

          {/* Header stats */}
          <div className="relative mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-indigo-100">
                  Total Projects
                </span>
                <FiFolder className="text-indigo-200" />
              </div>
              <p className="mt-2 text-2xl font-bold text-white">
                {totalProjects}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-indigo-100">
                  In Progress
                </span>
                <FiActivity className="text-indigo-200" />
              </div>
              <p className="mt-2 text-2xl font-bold text-white">
                {activeProjects}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-indigo-100">
                  Planning
                </span>
                <FiClock className="text-indigo-200" />
              </div>
              <p className="mt-2 text-2xl font-bold text-white">
                {planningProjects}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-indigo-100">
                  Completed
                </span>
                <FiCheckCircle className="text-indigo-200" />
              </div>
              <p className="mt-2 text-2xl font-bold text-white">
                {completedProjects}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mt-6 rounded-3xl border border-gray-100 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="border-b border-gray-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                All Projects
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage and monitor your current projects.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Search */}
              <div className="relative min-w-0 sm:w-64">
                <FiSearch
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10"
                />
              </div>

              {/* Status filter */}
              <div className="relative">
                <FiFilter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-9 text-sm text-gray-700 outline-none transition focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10 sm:w-44"
                >
                  <option value="All">All Status</option>
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <FiChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Company filter */}
              <div className="relative">
                <select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-9 text-sm text-gray-700 outline-none transition focus:border-[#5B52C7] focus:bg-white focus:ring-2 focus:ring-[#5B52C7]/10 sm:w-48"
                >
                  <option value="All">All Companies</option>

                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>

                <FiChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Project
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Company
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Client
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Timeline
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Budget
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Progress
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-gray-100 transition hover:bg-[#F8F8FD]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#5B52C7]">
                          <FiFolder size={18} />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {project.name}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            {project.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-sm font-medium text-gray-700">
                      {project.company}
                    </td>

                    <td className="px-5 py-5 text-sm text-gray-600">
                      {project.client}
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FiCalendar size={14} className="text-gray-400" />
                        <div>
                          <p>{project.startDate}</p>
                          <p className="mt-1 text-gray-400">
                            Due {project.dueDate}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-sm font-semibold text-gray-800">
                      {project.budget}
                    </td>

                    <td className="px-5 py-5">
                      <div className="w-32">
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-700">
                            {project.progress}%
                          </span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full transition-all ${getProgressStyle(
                              project.progress
                            )}`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-right">
                      <button className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700">
                        <FiMoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-16 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                        <FiFolder size={24} />
                      </div>

                      <h3 className="mt-4 font-semibold text-gray-900">
                        No projects found
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filter criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-gray-100 px-6 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredProjects.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">
              {projectsData.length}
            </span>{" "}
            projects
          </span>

          <span className="text-xs text-gray-400">
            Project workspace
          </span>
        </div>
      </div>
    </div>
  );
};

export default Project;