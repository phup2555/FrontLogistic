import React, { useEffect, useState } from "react";
import { Button, Input, Pagination } from "antd";
// import { PdDatasHistory } from "../service/Service";
import { useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { DatePicker, Select } from "antd";
import XLSX from "xlsx-js-style";
import moment from "moment";
export default function Report() {
  // const [PdData, setPdData] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 6;
  // const { RangePicker } = DatePicker;
  // const { Option } = Select;
  // const [dateRange, setDateRange] = useState(null);
  // const [statusFilter, setStatusFilter] = useState("0");
  // const baseurl = "http://localhost:4000/public";
  // const inputRef = useRef(null);
  // const fetchPdData = async () => {
  //   try {
  //     const response = await PdDatasHistory();
  //     setPdData(response);
  //   } catch (error) {
  //     console.error("Cannot get all product data:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchPdData();
  // }, []);
  // useEffect(() => {
  //   inputRef.current.focus();
  // });
  // const filteredSearchData = PdData.filter((item) => {
  //   const lowerSearch = searchTerm.toLowerCase();

  //   // search
  //   const matchesSearch =
  //     item.pd_customer_name?.toLowerCase().includes(lowerSearch) ||
  //     item.pd_SBox?.toLowerCase().includes(lowerSearch) ||
  //     item.pd_customer_No_box?.toLowerCase().includes(lowerSearch) ||
  //     item.barcode?.split("/barcodes/").includes(searchTerm);

  //   // date filter
  //   let matchesDate = true;
  //   if (dateRange && dateRange.length === 2) {
  //     const start = dateRange[0].startOf("day").toDate();
  //     const end = dateRange[1].endOf("day").toDate();

  //     const incoming = item.create_date ? new Date(item.create_date) : null;
  //     const out = item.create_date ? new Date(item.create_date) : null;

  //     matchesDate =
  //       (incoming && incoming >= start && incoming <= end) ||
  //       (out && out >= start && out <= end);
  //   }

  //   // status filter
  //   const status = Number(statusFilter);
  //   const itemStatus = Number(item.pd_status);

  //   let matchesStatus = true;
  //   if (status === 1) {
  //     matchesStatus = itemStatus === 1;
  //   } else if (status === 2) {
  //     matchesStatus = itemStatus === 2;
  //   } else if (status === 0) {
  //     matchesStatus = true;
  //   }

  //   // return แต่ละตัว filter แยกอิสระ
  //   return matchesSearch && matchesDate && matchesStatus;
  // });

  // const totalPages = Math.ceil(filteredSearchData.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // console.log({ filteredSearchData });
  // const paginatedData = filteredSearchData.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  //   setCurrentPage(1);
  // };

  // const exportToExcel = () => {
  //   const title = "ລາຍງານສິນຄ້າໃນສາງ";
  //   const subtitle = `ປະຈຳວັນທີ: ${new Date().toLocaleDateString("en-GB")}`;

  //   const headers = [
  //     "No",
  //     "Company",
  //     "NoBox",
  //     "Sbox",
  //     "Incoming Date",
  //     "Doc_In",
  //     "Out Date",
  //     "Doc_Out",
  //     "Create Date",
  //     "Action",
  //     "Status",
  //   ];

  //   const dataRows = filteredSearchData.map((d, i) => {
  //     console.log({ d });
  //     const incoming = d.pd_incoming_date
  //       ? new Date(d.pd_incoming_date).toLocaleDateString("en-GB")
  //       : "";
  //     const out = d.pd_out_date
  //       ? new Date(d.pd_out_date).toLocaleDateString("en-GB")
  //       : "";
  //     const create = d.create_date
  //       ? new Date(d.create_date).toLocaleDateString("en-GB")
  //       : "";
  //     const action =
  //       d.action === "create"
  //         ? "ນຳເຂົ້າ"
  //         : d.action === "update"
  //         ? "ແກ້ໄຂຂໍ້ມູນ"
  //         : d.action === "outStock"
  //         ? "ສິນຄ້ານຳອອກແລ້ວ"
  //         : "";
  //     const status =
  //       d.pd_status == 1
  //         ? "🟢 ຢູ່ໃນສາງ"
  //         : d.pd_status == 2
  //         ? "🔴 ນຳອອກແລ້ວ"
  //         : "";

  //     return [
  //       i + 1,
  //       d.pd_customer_name || "",
  //       d.pd_customer_No_box || "",
  //       d.pd_SBox || "",
  //       incoming,
  //       d.pd_Document || "",
  //       out,
  //       d.pd_Document_Out || "",
  //       create,
  //       action,
  //       status,
  //     ];
  //   });

  //   const aoa = [];
  //   aoa.push([]);
  //   aoa.push([]);
  //   aoa.push([]);
  //   aoa.push([]);
  //   aoa.push([title]); // A5
  //   aoa.push([subtitle]); // A6
  //   aoa.push([]); // A7
  //   aoa.push(headers);
  //   dataRows.forEach((r) => aoa.push(r));

  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.aoa_to_sheet(aoa);

  //   // Merge Title & Subtitle
  //   ws["!merges"] = [
  //     { s: { r: 4, c: 0 }, e: { r: 4, c: 8 } }, // A5:I5
  //     { s: { r: 5, c: 0 }, e: { r: 5, c: 8 } }, // A6:I6
  //   ];

  //   ws["!cols"] = [
  //     { wpx: 40 },
  //     { wpx: 180 },
  //     { wpx: 120 },
  //     { wpx: 100 },
  //     { wpx: 120 },
  //     { wpx: 120 },
  //     { wpx: 120 },
  //     { wpx: 140 },
  //     { wpx: 150 },
  //   ];

  //   // border reusable
  //   const border = {
  //     top: { style: "thin", color: { rgb: "FFDDDDDD" } },
  //     bottom: { style: "thin", color: { rgb: "FFDDDDDD" } },
  //     left: { style: "thin", color: { rgb: "FFDDDDDD" } },
  //     right: { style: "thin", color: { rgb: "FFDDDDDD" } },
  //   };

  //   // Title & subtitle style
  //   ws["A5"].s = {
  //     font: { sz: 18, bold: true, color: { rgb: "FFFFFFFF" } },
  //     fill: { patternType: "solid", fgColor: { rgb: "FF2563EB" } }, // blue
  //     alignment: { horizontal: "center", vertical: "center" },
  //   };

  //   ws["A6"].s = {
  //     font: { sz: 11, italic: true, color: { rgb: "FF374151" } },
  //     alignment: { horizontal: "center", vertical: "center" },
  //   };

  //   // Header row style (row 8)
  //   const headerRow = 7;
  //   headers.forEach((_, c) => {
  //     const addr = XLSX.utils.encode_cell({ r: headerRow, c });
  //     if (!ws[addr]) return;
  //     ws[addr].s = {
  //       font: { bold: true, color: { rgb: "FFFFFFFF" } },
  //       fill: { patternType: "solid", fgColor: { rgb: "FF111827" } }, // dark gray
  //       alignment: { horizontal: "center", vertical: "center" },
  //       border,
  //     };
  //   });

  //   // Data rows style
  //   const startData = 8;
  //   dataRows.forEach((row, i) => {
  //     row.forEach((cell, c) => {
  //       const addr = XLSX.utils.encode_cell({ r: startData + i, c });
  //       if (!ws[addr]) return;
  //       ws[addr].s = {
  //         font: { sz: 10 },
  //         alignment: { horizontal: "center", vertical: "center" },
  //         border,
  //       };

  //       // Incoming Date (green)
  //       if (c === 4 && cell) {
  //         ws[addr].s.fill = {
  //           patternType: "solid",
  //           fgColor: { rgb: "FFDCFCE7" },
  //         };
  //         ws[addr].s.font.color = { rgb: "FF065F46" };
  //       }

  //       // Out Date (red)
  //       if (c === 5 && cell) {
  //         ws[addr].s.fill = {
  //           patternType: "solid",
  //           fgColor: { rgb: "FFFEE2E2" },
  //         };
  //         ws[addr].s.font.color = { rgb: "FF7F1D1D" };
  //       }

  //       // Status
  //       if (c === 8 && cell) {
  //         if (cell.includes("ຢູ່ໃນສາງ")) {
  //           ws[addr].s.fill = {
  //             patternType: "solid",
  //             fgColor: { rgb: "FFDCFCE7" },
  //           };
  //           ws[addr].s.font = {
  //             color: { rgb: "FF0F5132" },
  //             bold: true,
  //           };
  //         } else if (cell.includes("ນຳອອກແລ້ວ")) {
  //           ws[addr].s.fill = {
  //             patternType: "solid",
  //             fgColor: { rgb: "FFFEE2E2" },
  //           };
  //           ws[addr].s.font = {
  //             color: { rgb: "FF7F1D1D" },
  //             bold: true,
  //           };
  //         }
  //       }
  //     });
  //   });

  //   XLSX.utils.book_append_sheet(wb, ws, "Report");
  //   XLSX.writeFile(
  //     wb,
  //     `report_${new Date().toISOString().replace(/[:.]/g, "-")}.xlsx`
  //   );
  // };

  return (
    // <div className="p-4 sm:p-6">
    //   <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
    //     ປະຫວັດ (History)
    //   </h1>
    //   <div className="mb-6 flex justify-between items-center ">
    //     <div className="flex gap-2 ">
    //       <RangePicker
    //         value={dateRange}
    //         onChange={(dates) => setDateRange(dates)}
    //         format="YYYY-MM-DD"
    //         placeholder={["ວັນທີເລີມ", "ວັນທີສິ້ນສຸດ"]}
    //       />

    //       <Select
    //         value={statusFilter}
    //         onChange={(value) => setStatusFilter(value)}
    //         style={{ width: 150 }}
    //         placeholder="ເລືອກສະຖານະ"
    //         allowClear
    //       >
    //         <Option value="0">ທັງໝົດ</Option>
    //         <Option value="1">ຢູ່ໃນສາງ</Option>
    //         <Option value="2">ນຳອອກແລ້ວ</Option>
    //       </Select>
    //     </div>

    //     <div className="relative w-full sm:w-[350px]">
    //       <Input
    //         placeholder="ຄົ້ນຫາ customer name, SBox, or No_box..."
    //         ref={inputRef}
    //         value={searchTerm}
    //         onChange={handleSearchChange}
    //         prefix={<IoMdSearch className="text-gray-500 text-lg" />}
    //         allowClear
    //       />
    //     </div>
    //   </div>
    //   <div className="flex justify-end mb-1">
    //     <Button
    //       className="bg-[#928E85] hover:!bg-[#7a776f]"
    //       type="primary"
    //       onClick={exportToExcel}
    //     >
    //       Export to Excel
    //     </Button>
    //   </div>
    //   <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
    //     <table className="min-w-full bg-white divide-y divide-gray-200">
    //       <thead className="bg-[#928E85] text-white text-center">
    //         <tr>
    //           <th className="py-3 px-4 font-medium">ບໍລິສັດ</th>
    //           <th className="py-3 px-4 font-medium">ລະຫັດພັດສະດຸ</th>
    //           <th className="py-3 px-4 font-medium">ລະຫັດ S/Box</th>
    //           <th className="py-3 px-4 font-medium">ເຂົ້າສາງ</th>
    //           <th className="py-3 px-4 font-medium">ເອກະສານຂາເຂົ້າ</th>
    //           <th className="py-3 px-4 font-medium">ອອກສາງ</th>
    //           <th className="py-3 px-4 font-medium">ເອກະສານຂາອອກ</th>
    //           {/* <th className="py-3 px-4 font-medium">ບາໂຄດ</th> */}
    //           <th className="py-3 px-4 font-medium">ວັນທີ່ປ່ຽນແປງ</th>
    //           <th className="py-3 px-4 font-medium">ທຸລະກຳ</th>
    //         </tr>
    //       </thead>

    //       <tbody className="divide-y divide-gray-100">
    //         {paginatedData.length === 0 ? (
    //           <tr>
    //             <td colSpan={9} className="text-center py-6 text-gray-500">
    //               ບໍ່ພົບຂໍ້ມູນ
    //             </td>
    //           </tr>
    //         ) : (
    //           paginatedData.map((item) => (
    //             <tr
    //               key={item.pd_customer_No_box + item.pd_SBox}
    //               className="text-center hover:bg-gray-50 transition duration-200"
    //             >
    //               <td className="py-3 px-4">{item.pd_customer_name}</td>
    //               <td className="py-3 px-4">{item.pd_customer_No_box}</td>
    //               <td className="py-3 px-4">{item.pd_SBox}</td>
    //               <td className="py-3 px-4">
    //                 {item.pd_incoming_date ? (
    //                   <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold">
    //                     {new Date(item.pd_incoming_date).toLocaleDateString(
    //                       "en-GB"
    //                     )}
    //                   </span>
    //                 ) : (
    //                   <span className="text-gray-400">-</span>
    //                 )}
    //               </td>
    //               <td className="py-3 px-4">{item.pd_Document}</td>
    //               <td className="py-3 px-4">
    //                 {item.pd_out_date ? (
    //                   <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-800 font-semibold">
    //                     {new Date(item.pd_out_date).toLocaleDateString("en-GB")}
    //                   </span>
    //                 ) : (
    //                   <span className="text-gray-400">-</span>
    //                 )}
    //               </td>
    //               <td className="py-3 px-4">{item.pd_Document_Out}</td>
    //               {/* <td className="py-3 px-4 flex justify-center items-center">
    //                 {item.pd_customer_No_box ? (
    //                   <img
    //                     src={`${baseurl}${item.barcode}`}
    //                     alt={`barcode-${item.pd_customer_No_box}`}
    //                     className="h-12 w-40"
    //                   />
    //                 ) : (
    //                   <span className="text-gray-400">-</span>
    //                 )}
    //               </td> */}
    //               <td className="py-3 px-4">
    //                 {item.create_date ? (
    //                   <span className="inline-block px-3 py-1 font-semibold">
    //                     {moment(item.create_date).format("DD/MM/YYYY HH:mm")}
    //                   </span>
    //                 ) : (
    //                   <span className="text-gray-400">-</span>
    //                 )}
    //               </td>
    //               <td className="py-3 px-4">
    //                 {item.action === "create"
    //                   ? "ນຳເຂົ້າ"
    //                   : item.action === "update"
    //                   ? "ແກ້ໄຂຂໍ້ມູນ"
    //                   : item.action === "outStock"
    //                   ? "ສິນຄ້ານຳອອກແລ້ວ"
    //                   : ""}
    //               </td>
    //             </tr>
    //           ))
    //         )}
    //       </tbody>
    //     </table>
    //   </div>{" "}
    //   <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2">
    //     <p className="text-gray-600 text-base">
    //       ໜ້າ {currentPage} of {totalPages || 1}
    //     </p>

    //     <Pagination
    //       current={currentPage}
    //       total={filteredSearchData.length}
    //       pageSize={itemsPerPage}
    //       onChange={(page) => setCurrentPage(page)}
    //       showSizeChanger={false}
    //       className="flex justify-center"
    //     />
    //   </div>
    // </div>

    <div className="">report</div>
  );
}
