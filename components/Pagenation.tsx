"use client";

import { useEffect, useState } from "react";

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalPages = 10,
  currentPage = 1,
  onPageChange,
}: Props) {
  const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);

  useEffect(() => {
    setLocalCurrentPage(currentPage);
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== localCurrentPage) {
      setLocalCurrentPage(page);
      onPageChange(page);
    }
  };

  const goToPreviousPage = () => {
    if (localCurrentPage > 1) {
      const prev = localCurrentPage - 1;
      setLocalCurrentPage(prev);
      onPageChange(prev);
    }
  };

  const goToNextPage = () => {
    if (localCurrentPage < totalPages) {
      const next = localCurrentPage + 1;
      setLocalCurrentPage(next);
      onPageChange(next);
    }
  };

  const getVisiblePages = () => {
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];

    if (localCurrentPage > 3) pages.push("...");

    const start = Math.max(2, localCurrentPage - 1);
    const end = Math.min(localCurrentPage + 1, totalPages - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (localCurrentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center gap-2 w-full max-w-[335px] py-4">
      {/* Previous */}
      <button
        onClick={goToPreviousPage}
        disabled={localCurrentPage === 1}
        className={`w-8 h-8 rounded flex justify-center items-center ${
          localCurrentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200"
        }`}
      >
        <i
          className={`w-3 h-3 bg-center bg-no-repeat bg-contain ${
            localCurrentPage === 1 ? "disabledPrevIcon" : "prevIcon"
          }`}
        />
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, idx) =>
        typeof page === "number" ? (
          <button
            key={idx}
            onClick={() => goToPage(page)}
            className={`w-8 h-8 text-sm rounded flex justify-center items-center ${
              page === localCurrentPage
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={idx} className="w-8 h-8 flex items-center justify-center text-gray-400">
            ...
          </span>
        )
      )}

      {/* Next */}
      <button
        onClick={goToNextPage}
        disabled={localCurrentPage === totalPages}
        className={`w-8 h-8 rounded flex justify-center items-center ${
          localCurrentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200"
        }`}
      >
        <i
          className={`w-3 h-3 bg-center bg-no-repeat bg-contain ${
            localCurrentPage === totalPages ? "disabledNextIcon" : "nextIcon"
          }`}
        />
      </button>
    </div>
  );
}
