import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React, { useState } from "react";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineLeft,
  AiOutlineLoading3Quarters,
  AiOutlineRight,
} from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

const ReusableTable = ({
  columnHeaders = [],
  rows = [],
  rowsCount,
  setRowsCount,
  page,
  setPage,
  length,
  sortBy,
  staticColumn = false,
  orderBy,
  setSortBy,
  setOrderBy,
  onLoading,
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredSortableColumn, setHoveredSortableColumn] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onSortHandler = (col) => {
    if (col.sortable) {
      if (sortBy !== col.value) {
        setSortBy(col.value);
        setOrderBy("asc");
      } else {
        if (orderBy === "asc") setOrderBy("desc");
        if (orderBy === "desc") {
          setSortBy("");
          setOrderBy("");
        }
      }
    }
  };

  const sortedRows = [...rows];
  const rowsPerPageOptions = [10, 15, 20];
  const tempArr = Array.from({ length: rowsCount }, () =>
    Array(columnHeaders.length).fill(1)
  );

  const handleCellClick = (row, cellIndex) => {
    if (cellIndex !== row.length - 1) {
      const redirectTo = row[0].props.to;
      if (redirectTo) {
        if (redirectTo.startsWith("/")) {
          navigate(redirectTo);
        } else {
          navigate(`${pathname}/${redirectTo}`);
        }
      }
    }
  };

  return (
    <div>
      <div className="custom-scrollbar  my-3 rounded-lg border border-gray-300 overflow-x-auto">
        <div>
          <Table>
            <TableHead>
              {columnHeaders.map((header, index) => (
                <TableHeadCell
                  key={index}
                  className={`bg-gray-200 text-gray-600 cursor-pointer font-bold ${
                    header.sortable && hoveredSortableColumn === index
                      ? "hover:cursor-pointer"
                      : ""
                  }${
                    index === 0
                      ? "whitespace-nowrap font-bold text-gray-600 dark:text-gray-400 dark:bg-gray-800 sticky left-0 z-2 bg-gray-200"
                      : ""
                  }`}
                  onMouseEnter={() => {
                    if (header.sortable) setHoveredSortableColumn(index);
                  }}
                  onMouseLeave={() => setHoveredSortableColumn(null)}
                  onClick={() => onSortHandler(header)}
                >
                  <div
                    className={`flex items-center whitespace-nowrap ${
                      header.className === "text-center" ? "justify-center" : ""
                    }`}
                  >
                    {header.label}
                  </div>
                </TableHeadCell>
              ))}
            </TableHead>
            <TableBody className="divide-y">
              {onLoading
                ? tempArr.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 text-md font-base"
                    >
                      {row.map((cell, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          className={`${
                            cellIndex === 0
                              ? "whitespace-nowrap font-medium text-gray-900 dark:text-white"
                              : ""
                          } ${
                            cellIndex === row.length - 1 ? "w-28 max-w-28" : ""
                          } whitespace-nowrap`}
                        >
                          {/* <Skeleton /> */}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : sortedRows.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      className={`bg-white dark:border-gray-700 dark:bg-gray-800 text-md font-base hover:bg-[#F1F7F9] group`}
                      onMouseEnter={() => setHoveredRow(rowIndex)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {row.map((cell, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          className={`${
                            cellIndex === 0
                              ? "whitespace-nowrap font-medium text-gray-900 dark:text-gray-400 dark:bg-gray-800 sticky left-0 z-2 bg-white group-hover:bg-[#F1F7F9]"
                              : ""
                          } ${
                            cellIndex === row.length - 1 ? "w-28 max-w-28" : ""
                          } whitespace-nowrap overflow-hidden`}
                          onClick={(e) => {
                            if (
                              e.target.tagName !== "DIV" &&
                              e.target.tagName !== "INPUT"
                            ) {
                              handleCellClick(row, cellIndex);
                            }
                          }}
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ReusableTable;
