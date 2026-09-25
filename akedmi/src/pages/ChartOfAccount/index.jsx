import { useMemo, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiBookOpen,
  FiDollarSign,
  FiLayers,
  FiCheckCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const accountsData = [
  {
    id: 1,
    code: "1000",
    name: "Cash & Bank",
    type: "Asset",
    parent: "Current Assets",
    balance: "$24,850",
    status: "Active",
  },
  {
    id: 2,
    code: "1100",
    name: "Accounts Receivable",
    type: "Asset",
    parent: "Current Assets",
    balance: "$18,420",
    status: "Active",
  },
  {
    id: 3,
    code: "1200",
    name: "Inventory",
    type: "Asset",
    parent: "Current Assets",
    balance: "$32,750",
    status: "Active",
  },
  {
    id: 4,
    code: "2000",
    name: "Accounts Payable",
    type: "Liability",
    parent: "Current Liabilities",
    balance: "$12,680",
    status: "Active",
  },
  {
    id: 5,
    code: "2100",
    name: "Short Term Loans",
    type: "Liability",
    parent: "Current Liabilities",
    balance: "$8,500",
    status: "Active",
  },
  {
    id: 6,
    code: "3000",
    name: "Owner's Equity",
    type: "Equity",
    parent: "Equity",
    balance: "$45,000",
    status: "Active",
  },
  {
    id: 7,
    code: "4000",
    name: "Sales Revenue",
    type: "Revenue",
    parent: "Operating Revenue",
    balance: "$86,450",
    status: "Active",
  },
  {
    id: 8,
    code: "5000",
    name: "Operating Expenses",
    type: "Expense",
    parent: "Expenses",
    balance: "$28,340",
    status: "Active",
  },
];

const accountTypes = [
  "All Types",
  "Asset",
  "Liability",
  "Equity",
  "Revenue",
  "Expense",
];

const typeStyles = {
  Asset: {
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700",
  },
  Liability: {
    dot: "bg-orange-500",
    badge: "bg-orange-50 text-orange-700",
  },
  Equity: {
    dot: "bg-purple-500",
    badge: "bg-purple-50 text-purple-700",
  },
  Revenue: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700",
  },
  Expense: {
    dot: "bg-rose-500",
    badge: "bg-rose-50 text-rose-700",
  },
};

const ChartOfAccount = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const filteredAccounts = useMemo(() => {
    return accountsData.filter((account) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        account.name.toLowerCase().includes(searchValue) ||
        account.code.toLowerCase().includes(searchValue) ||
        account.parent.toLowerCase().includes(searchValue);

      const matchesType =
        typeFilter === "All Types" || account.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const totalAccounts = accountsData.length;

  const totalAssets = accountsData.filter(
    (account) => account.type === "Asset"
  ).length;

  const totalLiabilities = accountsData.filter(
    (account) => account.type === "Liability"
  ).length;

  const totalEquity = accountsData.filter(
    (account) => account.type === "Equity"
  ).length;

  const totalRevenue = accountsData.filter(
    (account) => account.type === "Revenue"
  ).length;

  const totalExpenses = accountsData.filter(
    (account) => account.type === "Expense"
  ).length;

  const activeAccounts = accountsData.filter(
    (account) => account.status === "Active"
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      <Navbar />

      <main className="px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px] space-y-6">

          {/* Header */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#443B9A] via-[#5B52C7] to-[#7067D8] shadow-lg">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative p-7 md:p-9">
              <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

                {/* Header Content */}
                <div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                      <FiBookOpen size={26} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-100">
                        Accounting
                      </p>

                      <h1 className="mt-1 text-2xl font-bold text-white md:text-3xl">
                        Chart of Accounts
                      </h1>
                    </div>
                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-6 text-purple-100 md:text-base">
                    Organize and manage your financial accounts with a clear
                    structure for assets, liabilities, equity, revenue, and
                    expenses.
                  </p>
                </div>

                {/* Header Actions */}
                <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
                  <div className="flex flex-wrap gap-2">
                    <div className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                      <span className="font-bold">{totalAccounts}</span>{" "}
                      accounts
                    </div>

                    <div className="rounded-full bg-emerald-400/20 px-4 py-2 text-sm font-medium text-emerald-50 backdrop-blur-sm">
                      <span className="font-bold">{activeAccounts}</span>{" "}
                      active
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/add-account")}
                    className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#5B52C7] shadow-sm transition hover:bg-purple-50"
                  >
                    <FiPlus size={17} />
                    Add Account
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<FiBookOpen />}
              label="Total Accounts"
              value={totalAccounts}
              description="Across all categories"
            />

            <StatCard
              icon={<FiDollarSign />}
              label="Assets"
              value={totalAssets}
              description="Current asset accounts"
            />

            <StatCard
              icon={<FiLayers />}
              label="Liabilities"
              value={totalLiabilities}
              description="Current liability accounts"
            />

            <StatCard
              icon={<FiCheckCircle />}
              label="Active Accounts"
              value={activeAccounts}
              description="Currently in use"
            />
          </section>

          {/* Account Structure */}
          <section className="rounded-2xl border border-gray-200 bg-white px-5 py-5 shadow-sm md:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Account Structure
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Accounts grouped by financial category
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <StructureItem
                  label="Assets"
                  count={totalAssets}
                  dot="bg-blue-500"
                />

                <StructureItem
                  label="Liabilities"
                  count={totalLiabilities}
                  dot="bg-orange-500"
                />

                <StructureItem
                  label="Equity"
                  count={totalEquity}
                  dot="bg-purple-500"
                />

                <StructureItem
                  label="Revenue"
                  count={totalRevenue}
                  dot="bg-emerald-500"
                />

                <StructureItem
                  label="Expenses"
                  count={totalExpenses}
                  dot="bg-rose-500"
                />
              </div>
            </div>
          </section>

          {/* Account List */}
          <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

            {/* Table Header */}
            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Account List
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your chart of accounts
                </p>
              </div>

              {/* Search + Filter */}
              <div className="flex flex-col gap-3 sm:flex-row">

                <div className="relative">
                  <FiSearch
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={17}
                  />

                  <input
                    type="text"
                    placeholder="Search accounts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#8A83DD] focus:bg-white focus:ring-2 focus:ring-[#8A83DD]/10 sm:w-64"
                  />
                </div>

                <div className="relative">
                  <FiFilter
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />

                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="h-11 appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-9 text-sm text-gray-700 outline-none transition focus:border-[#8A83DD] focus:bg-white focus:ring-2 focus:ring-[#8A83DD]/10"
                  >
                    {accountTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">

                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Code
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Account
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Type
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Parent Account
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Balance
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAccounts.map((account) => (
                    <AccountRow
                      key={account.id}
                      account={account}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredAccounts.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                  <FiSearch size={22} />
                </div>

                <h3 className="mt-4 font-semibold text-gray-900">
                  No accounts found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or filter.
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="flex flex-col gap-2 border-t border-gray-100 px-6 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {filteredAccounts.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                  {totalAccounts}
                </span>{" "}
                accounts
              </span>

              <span className="text-xs text-gray-400">
                Chart of Accounts
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

/* Structure Item */
const StructureItem = ({ label, count, dot }) => (
  <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2">
    <span className={`h-2 w-2 rounded-full ${dot}`} />

    <span className="text-xs font-medium text-gray-600">
      {label}
    </span>

    <span className="text-sm font-bold text-gray-900">
      {count}
    </span>
  </div>
);

/* Statistic Card */
const StatCard = ({
  icon,
  label,
  value,
  description,
}) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-start justify-between">

      <div>
        <p className="text-sm font-medium text-gray-500">
          {label}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-gray-900">
          {value}
        </h3>
      </div>

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0EEFF] text-[#5B52C7]">
        {icon}
      </div>
    </div>

    <p className="mt-3 text-xs text-gray-400">
      {description}
    </p>
  </div>
);

/* Account Row */
const AccountRow = ({ account }) => {
  const style = typeStyles[account.type];

  return (
    <tr className="border-b border-gray-100 last:border-0 transition hover:bg-[#fafaff]">

      {/* Code */}
      <td className="px-6 py-4">
        <span className="rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-xs font-semibold text-gray-600">
          {account.code}
        </span>
      </td>

      {/* Account */}
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {account.name}
          </p>

          <p className="mt-0.5 text-xs text-gray-400">
            Account #{account.code}
          </p>
        </div>
      </td>

      {/* Type */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${style.badge}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
          />

          {account.type}
        </span>
      </td>

      {/* Parent */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">
          {account.parent}
        </span>
      </td>

      {/* Balance */}
      <td className="px-6 py-4 text-right">
        <span className="text-sm font-bold text-gray-900">
          {account.balance}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

          {account.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1">

          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-purple-50 hover:text-[#5B52C7]">
            <FiEdit2 size={15} />
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500">
            <FiTrash2 size={15} />
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700">
            <FiMoreVertical size={17} />
          </button>

        </div>
      </td>
    </tr>
  );
};

export default ChartOfAccount;