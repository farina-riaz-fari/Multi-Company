import React, { useState } from "react";
import { IoCaretForwardOutline } from "react-icons/io5";
import { IoCaretBackOutline } from "react-icons/io5";

const TableWithPagination = ({
  columns,
  data,
  itemsPerPage = 8,
  noDataText = "No data found",
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="w-full">
      {/* Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white w-full px-2 sm:px-4 pb-6 ">
        <table className="min-w-[1000px] w-full text-left text-gray-700">
          <thead className="bg-white border-b font-bold text-[#303972] text-md">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-6 text-center align-top ${
                    idx === 0 ? "text-start" : ""
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#A098AE]">
            {currentData.length ? (
              currentData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map((col, cidx) => (
                    <td key={cidx} className="px-6 py-5 text-center">
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-[#303972] font-medium"
                >
                  {noDataText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end py-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-2 disabled:opacity-40"
        >
          <IoCaretBackOutline />
        </button>

        <div className="flex items-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1
            ) {
              return (
                <button
                  key={page}
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    currentPage === page
                      ? "bg-[#4D44B5] text-white"
                      : "text-[#4D44B5]"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              );
            } else if (
              (page === 2 && currentPage > 3) ||
              (page === totalPages - 1 && currentPage < totalPages - 2)
            ) {
              return (
                <span
                  key={page}
                  className="w-10 h-10 flex items-center justify-center text-[#4D44B5]"
                >
                  ...
                </span>
              );
            }
            return null;
          })}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-2 disabled:opacity-40"
        >
          <IoCaretForwardOutline />
        </button>
      </div>
    </div>
  );
};

export default TableWithPagination;
