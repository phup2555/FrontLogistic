import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Pagination, DatePicker, Select } from "antd";
import { IoMdSearch } from "react-icons/io";
import XLSX from "xlsx-js-style";
import moment from "moment";
import { getLogs } from "../service/Service";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function Report() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState(null);
  const [actionFilter, setActionFilter] = useState(""); // "" = All
  const inputRef = useRef(null);

  const itemsPerPage = 10;

  const fetchLogs = async () => {
    try {
      const res = await getLogs();
      setLogs(res.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // --- Filtering Logic ---
  const filteredSearchData = logs.filter((item) => {
    const lowerSearch = searchTerm.toLowerCase();

    // Search filter (เฉพาะ note และ username)
    const matchesSearch =
      (item.note && item.note.toLowerCase().includes(lowerSearch)) ||
      (item.username && item.username.toLowerCase().includes(lowerSearch));

    // Date filter
    let matchesDate = true;
    if (dateRange && dateRange.length === 2) {
      const start = dateRange[0].startOf("day").toDate();
      const end = dateRange[1].endOf("day").toDate();
      const logDate = item.action_date ? new Date(item.action_date) : null;
      matchesDate = logDate && logDate >= start && logDate <= end;
    }

    // Action filter (จาก dropdown)
    let matchesAction = true;
    if (actionFilter) matchesAction = item.action === actionFilter;

    return matchesSearch && matchesDate && matchesAction;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredSearchData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // --- Export Excel (เหมือนเดิม) ---
  const exportToExcel = () => {
    const title = "System Logs Report";
    const subtitle = `Export Date: ${moment().format("DD/MM/YYYY")}`;
    const headers = ["No", "User", "Action", "Date", "Customer_No_box", "Note"];

    const dataRows = filteredSearchData.map((d, i) => [
      i + 1,
      d.created_at ? moment(d.created_at).format("DD/MM/YYYY HH:mm:ss") : "-",
      d.username || "Unknown",
      d.action || "-",
      d.details || "-",
      d.ip_address || "-",
    ]);

    const aoa = [[], [], [], [], [title], [subtitle], [], headers, ...dataRows];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    ws["!merges"] = [{ s: { r: 4, c: 0 }, e: { r: 4, c: 5 } }];
    ws["!cols"] = [
      { wpx: 50 },
      { wpx: 150 },
      { wpx: 120 },
      { wpx: 120 },
      { wpx: 250 },
      { wpx: 100 },
    ];

    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const addr = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[addr]) continue;
        if (!ws[addr].s) ws[addr].s = {};
        ws[addr].s.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
        if (R === 7) {
          ws[addr].s.fill = { fgColor: { rgb: "FFCCCCCC" } };
          ws[addr].s.font = { bold: true };
          ws[addr].s.alignment = { horizontal: "center" };
        }
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, "Logs");
    XLSX.writeFile(wb, `System_Logs_${moment().format("YYYYMMDD_HHmm")}.xlsx`);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        ລາຍງານປະຫວັດ (System Logs)
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <RangePicker
          value={dateRange}
          onChange={(dates) => setDateRange(dates)}
          format="DD/MM/YYYY"
          className="w-full sm:w-auto"
          placeholder={["Start Date", "End Date"]}
        />
        <div className=" flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Select
            value={actionFilter}
            onChange={(value) => setActionFilter(value)}
            className="w-full sm:w-48"
            placeholder="Filter by Action"
            allowClear
            options={[
              { value: "ADD", label: "ADD" },
              { value: "Edit product", label: "Edit product" },
              { value: "OutStock", label: "OutStock" },
            ]}
          />
          <Input
            placeholder="Search user, note..."
            ref={inputRef}
            value={searchTerm}
            onChange={handleSearchChange}
            prefix={<IoMdSearch className="text-gray-500 text-lg" />}
            allowClear
            className="rounded-md shadow-sm w-full sm:w-[300px] text-base"
          />
        </div>
      </div>

      {/* --- Export Button --- */}
      <div className="flex justify-end mb-3">
        <Button
          className="bg-green-600 hover:!bg-green-700 text-white border-none shadow-md flex items-center gap-2"
          onClick={exportToExcel}
        >
          Export Excel
        </Button>
      </div>

      {/* --- Table --- */}
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#928E85] text-white text-center">
            <tr>
              <th className="py-3 px-4 w-16">No.</th>
              <th className="py-3 px-4">Date/Time</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  ບໍ່ພົບຂໍ່ມູນ (No Data Found)
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="py-3 px-4 text-center text-gray-500">
                    {startIndex + index + 1}
                  </td>
                  <td className="py-3 px-4 text-gray-700 break-all">
                    {item.action_date
                      ? moment(item.action_date).format("DD/MM/YYYY HH:mm:ss")
                      : "-"}
                  </td>
                  <td className="py-3 px-4 text-center font-medium text-gray-800">
                    {item.username}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.action === "ADD"
                          ? "bg-green-100 text-green-800"
                          : item.action === "OutStock"
                          ? "bg-red-100 text-red-800"
                          : item.action === "Edit product"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.action || "Unknown"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-600 break-all">
                    {item.note || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- Pagination --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-gray-600 text-sm">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredSearchData.length)} of{" "}
          {filteredSearchData.length} entries
        </p>

        <Pagination
          current={currentPage}
          total={filteredSearchData.length}
          pageSize={itemsPerPage}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          className="shadow-sm rounded-md bg-white p-1"
        />
      </div>
    </div>
  );
}
