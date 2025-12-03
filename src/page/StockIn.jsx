import React, { useEffect, useState } from "react";
import { Input, Pagination, Button, Modal, Select } from "antd";
import { outStock, PdDatas } from "../service/Service";
import AddStock from "../component/AddStock";
import FormEdit from "../component/FormEdit";
import XLSX from "xlsx-js-style";
import { useRef } from "react";
// import BarcodeScannerComponent from "react-qr-barcode-scanner";
// import { BarcodeScanner } from "react-barcode-scanner";
// import "react-barcode-scanner/polyfill";
import { BarcodeScanner } from "@thewirv/react-barcode-scanner";

import { IoMdSearch } from "react-icons/io";
import { RiFileEditFill } from "react-icons/ri";
import { AiOutlineCheck } from "react-icons/ai";
import Swal from "sweetalert2";
export default function StockIn() {
  const [PdData, setPdData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editdata, setEditdata] = useState(null);
  const [editdataPopup, setEditdataPopup] = useState(false);
  const itemsPerPage = 6;
  const [scanOpen, setScanOpen] = useState(false);
  const inputRef = useRef(null);
  const [statusFilter, setStatusFilter] = useState("0");

  // const [scanResult, setScanResult] = useState("");
  const baseurl = "http://localhost:4000/public";

  const handleClickOut = async (item) => {
    try {
      const { value: docOut, isConfirmed } = await Swal.fire({
        title: "ຢືນຢັນ",
        text: `ທ່ານຕ້ອງການນຳອອກສິນຄ້າ ລະຫັດ ${item.pd_customer_No_box} ຫຼື ບໍ?`,
        input: "text",
        inputLabel: "ເອກະສານຂາອອກ",
        inputPlaceholder: "ປ້ອນເອກະສານຂາອອກທີ່ນີ້...",
        showCancelButton: true,
        confirmButtonText: "ຢືນຢັນ",
        cancelButtonText: "ຍົກເລີກ",
        buttonsStyling: false,
        customClass: {
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg mr-2",
          cancelButton:
            "bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg",
        },
        preConfirm: (value) => {
          if (!value) {
            Swal.showValidationMessage("⚠️ ກະລຸນາກອກເອກະສານຂາອອກ");
          }
          return value;
        },
      });

      if (!isConfirmed || !docOut) return;

      Swal.fire({
        title: "ກຳລັງນຳອອກ...",
        text: "ກະລຸນາລໍຖ້າສັກຄູ່...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await outStock(item.pd_id, item, docOut);

      Swal.close();

      if (res && res.status === 200) {
        await Swal.fire({
          title: "ສຳເລັດ!",
          text: "ການນຳອອກສິນຄ້າສຳເລັດແລ້ວ",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        fetchPdData();
      }
    } catch (error) {
      console.error("Error out stock:", error);
      Swal.fire({
        title: "ຜິດພາດ!",
        text: "ການນຳອອກລົ້ມເຫຼວ",
        icon: "error",
      });
    }
  };

  const fetchPdData = async () => {
    try {
      const response = await PdDatas();
      setPdData(response);
    } catch (error) {
      console.error("Cannot get all product data:", error);
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  });
  useEffect(() => {
    fetchPdData();
  }, []);

  const status = Number(statusFilter);

  const filteredSearchData = PdData.filter((item) => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      item.pd_customer_name?.toLowerCase().includes(lowerSearch) ||
      item.pd_SBox?.toLowerCase().includes(lowerSearch) ||
      item.pd_customer_No_box?.toLowerCase().includes(lowerSearch) ||
      item.barcode?.split("/barcodes/").includes(searchTerm);

    const itemStatus = Number(item.pd_status);
    let matchesStatus = true;
    if (status === 1) {
      matchesStatus = itemStatus === 1;
    } else if (status === 2) {
      matchesStatus = itemStatus === 2;
    } else if (status === 0) {
      matchesStatus = true;
    }

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredSearchData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredSearchData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  console.log({ paginatedData });
  const exportToExcel = () => {
    const title = "ລາຍງານສິນຄ້າໃນສາງ";
    const subtitle = `ປະຈຳວັນທີ: ${new Date().toLocaleDateString("en-GB")}`;

    const headers = [
      "No",
      "Company",
      "NoBox",
      "Sbox",
      "Incoming Date",
      "Doc_IN",
      "Out Date",
      "Doc_OUT",
      "Status",
    ];

    const dataRows = filteredSearchData.map((d, i) => {
      const incoming = d.pd_incoming_date
        ? new Date(d.pd_incoming_date).toLocaleDateString("en-GB")
        : "";
      const out = d.pd_out_date
        ? new Date(d.pd_out_date).toLocaleDateString("en-GB")
        : "";
      const status =
        d.pd_status == 1
          ? "🟢 ຢູ່ໃນສາງ"
          : d.pd_status == 2
          ? "🔴 ນຳອອກແລ້ວ"
          : "";

      return [
        i + 1,
        d.pd_customer_name || "",
        d.pd_customer_No_box || "",
        d.pd_SBox || "",
        incoming,
        d.pd_Document || "",
        out,
        d.pd_Document_Out || "",
        status,
      ];
    });

    const aoa = [];
    aoa.push([]);
    aoa.push([]);
    aoa.push([]);
    aoa.push([]);
    aoa.push([title]); // A5
    aoa.push([subtitle]); // A6
    aoa.push([]); // A7
    aoa.push(headers);
    dataRows.forEach((r) => aoa.push(r));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(aoa);

    ws["!merges"] = [
      { s: { r: 4, c: 0 }, e: { r: 4, c: 8 } }, // A5:I5
      { s: { r: 5, c: 0 }, e: { r: 5, c: 8 } }, // A6:I6
    ];

    ws["!cols"] = [
      { wpx: 40 },
      { wpx: 180 },
      { wpx: 120 },
      { wpx: 100 },
      { wpx: 120 },
      { wpx: 120 },
      { wpx: 120 },
      { wpx: 140 },
      { wpx: 150 },
    ];

    // border reusable
    const border = {
      top: { style: "thin", color: { rgb: "FFDDDDDD" } },
      bottom: { style: "thin", color: { rgb: "FFDDDDDD" } },
      left: { style: "thin", color: { rgb: "FFDDDDDD" } },
      right: { style: "thin", color: { rgb: "FFDDDDDD" } },
    };

    // Title & subtitle style
    ws["A5"].s = {
      font: { sz: 18, bold: true, color: { rgb: "FFFFFFFF" } },
      fill: { patternType: "solid", fgColor: { rgb: "FF2563EB" } }, // blue
      alignment: { horizontal: "center", vertical: "center" },
    };

    ws["A6"].s = {
      font: { sz: 11, italic: true, color: { rgb: "FF374151" } },
      alignment: { horizontal: "center", vertical: "center" },
    };

    // Header row style (row 8)
    const headerRow = 7;
    headers.forEach((_, c) => {
      const addr = XLSX.utils.encode_cell({ r: headerRow, c });
      if (!ws[addr]) return;
      ws[addr].s = {
        font: { bold: true, color: { rgb: "FFFFFFFF" } },
        fill: { patternType: "solid", fgColor: { rgb: "FF111827" } }, // dark gray
        alignment: { horizontal: "center", vertical: "center" },
        border,
      };
    });

    // Data rows style
    const startData = 8;
    dataRows.forEach((row, i) => {
      row.forEach((cell, c) => {
        const addr = XLSX.utils.encode_cell({ r: startData + i, c });
        if (!ws[addr]) return;
        ws[addr].s = {
          font: { sz: 10 },
          alignment: { horizontal: "center", vertical: "center" },
          border,
        };

        // Incoming Date (green)
        if (c === 4 && cell) {
          ws[addr].s.fill = {
            patternType: "solid",
            fgColor: { rgb: "FFDCFCE7" },
          };
          ws[addr].s.font.color = { rgb: "FF065F46" };
        }

        // Out Date (red)
        if (c === 6 && cell) {
          ws[addr].s.fill = {
            patternType: "solid",
            fgColor: { rgb: "FFFEE2E2" },
          };
          ws[addr].s.font.color = { rgb: "FF7F1D1D" };
        }

        // Status
        if (c === 8 && cell) {
          if (cell.includes("ຢູ່ໃນສາງ")) {
            ws[addr].s.fill = {
              patternType: "solid",
              fgColor: { rgb: "FFDCFCE7" },
            };
            ws[addr].s.font = {
              color: { rgb: "FF0F5132" },
              bold: true,
            };
          } else if (cell.includes("ນຳອອກແລ້ວ")) {
            ws[addr].s.fill = {
              patternType: "solid",
              fgColor: { rgb: "FFFEE2E2" },
            };
            ws[addr].s.font = {
              color: { rgb: "FF7F1D1D" },
              bold: true,
            };
          }
        }
      });
    });

    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(
      wb,
      `report_${new Date().toISOString().replace(/[:.]/g, "-")}.xlsx`
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        ຂໍ້ມູນພັດສະດຸ (Material information)
      </h1>

      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="">
          <AddStock onAdded={editdata} fetchPdData={fetchPdData} />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            className="w-full sm:w-[150px]"
            placeholder="ເລືອກສະຖານະ"
            allowClear
          >
            <Option value="0">ທັງໝົດ</Option>
            <Option value="1">ຢູ່ໃນສາງ</Option>
            <Option value="2">ນຳອອກແລ້ວ</Option>
          </Select>

          <Button
            type="default"
            className="bg-gray-200 hover:bg-gray-300 text-black font-semibold w-full sm:w-auto"
            onClick={() => setScanOpen(true)}
          >
            📷 Scan Barcode
          </Button>

          <Input
            placeholder="ຄົ້ນຫາ customer name, SBox, or No_box..."
            ref={inputRef}
            value={searchTerm}
            onChange={handleSearchChange}
            prefix={<IoMdSearch className="text-gray-500 text-lg" />}
            allowClear
            className="w-full sm:w-[250px] md:w-[350px]"
          />
        </div>
      </div>

      <div className="flex justify-end mb-2">
        <Button
          className="bg-[#928E85] hover:!bg-[#7a776f]"
          type="primary"
          onClick={exportToExcel}
        >
          ສ້າງໄຟລExcel
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-[#928E85] text-white text-center">
            <tr>
              <th className="py-3 px-4 font-medium">ບໍລິສັດ</th>
              <th className="py-3 px-4 font-medium">ລະຫັດພັດສະດຸ</th>
              <th className="py-3 px-4 font-medium">ລະຫັດ S/Box</th>
              <th className="py-3 px-4 font-medium">ເຂົ້າສາງ</th>
              <th className="py-3 px-4 font-medium">ເອກະສານຂາເຂົ້າ</th>
              <th className="py-3 px-4 font-medium">ອອກສາງ</th>
              <th className="py-3 px-4 font-medium">ເອກະສານຂາອອກ</th>
              {/* <th className="py-3 px-4 font-medium">ບາໂຄດ</th> */}
              <th className="py-3 px-4 font-medium">ໂຊນຈັດເກັບ</th>
              <th className="py-3 px-4 font-medium">ຈັດການ</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  ບໍ່ພົບຂໍ້ມູນ
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={item.pd_customer_No_box + item.pd_SBox}
                  className="text-center hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-4">{item.pd_customer_name}</td>
                  <td className="py-3 px-4">{item.pd_customer_No_box}</td>
                  <td className="py-3 px-4">{item.pd_SBox}</td>
                  <td className="py-3 px-4">
                    {item.pd_incoming_date ? (
                      <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold">
                        {new Date(item.pd_incoming_date).toLocaleDateString(
                          "en-GB"
                        )}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">{item.pd_Document}</td>
                  <td className="py-3 px-4">
                    {item.pd_out_date ? (
                      <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-800 font-semibold">
                        {new Date(item.pd_out_date).toLocaleDateString("en-GB")}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">{item.pd_Document_Out}</td>
                  {/* <td className="py-3 px-4 flex justify-center items-center">
                    {item.pd_customer_No_box ? (
                      <img
                        src={`${baseurl}${item.barcode}`}
                        alt={`barcode-${item.pd_customer_No_box}`}
                        className="h-12 w-40"
                      />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td> */}
                  <td className="py-3 px-4">{item.pd_store}</td>

                  {item.pd_status != 2 ? (
                    <td className="py-3 px-4 align-middle">
                      <div className="flex gap-2 justify-center items-center h-full">
                        <Button
                          type="primary"
                          size="small"
                          className="bg-[#928E85] hover:!bg-[#7a776f] flex items-center gap-1"
                          onClick={() => {
                            setEditdata(item);
                            setEditdataPopup(true);
                          }}
                        >
                          <RiFileEditFill className="text-white text-base" />
                        </Button>
                        <Button
                          type="primary"
                          size="small"
                          className="bg-[#3B82F6] hover:!bg-[#2563EB] flex items-center gap-1 shadow-md"
                          onClick={() => handleClickOut(item)}
                        >
                          <AiOutlineCheck className="text-white text-base" />
                        </Button>
                      </div>
                    </td>
                  ) : (
                    <td className="py-3 px-4 align-middle">
                      <div className="flex gap-2 justify-center items-center h-full">
                        <span className="text-gray-400">ສິນຄ້ານຳອອກແລ້ວ</span>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Modal
        title="Scan Barcode"
        open={scanOpen}
        footer={null}
        onCancel={() => setScanOpen(false)}
      >
        <div className="flex justify-center">
          {/* <BarcodeScannerComponent
            width={300}
            height={300}
            facingMode="environment"
            onUpdate={(err, result) => {
              console.log({ result, err });
              if (result) {
                // setScanResult(result.text);
                message.success(`Scanned: ${result.text}`);
                setSearchTerm(result.text);
                setScanOpen(false);
              }
            }}
          /> */}
          {/* <BarcodeScanner
            onCapture={(x) => {
              console.log({ x });
            }}
          /> */}
          <BarcodeScanner
            onSuccess={(text) => {
              setSearchTerm(text);
              setScanOpen(false);
            }}
            onError={(error) => {
              if (error) {
                console.error(error.message);
              }
            }}
            onLoad={() => console.log("Video feed has loaded!")}
            containerStyle={{ width: "100%" }}
          />
        </div>
        {searchTerm || "SCANNING..."}
      </Modal>
      {editdataPopup && (
        <FormEdit
          editdata={editdata}
          fetchPdData={fetchPdData}
          popup={setEditdataPopup}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2">
        <p className="text-gray-600 text-base">
          ໜ້າ {currentPage} of {totalPages || 1}
        </p>

        <Pagination
          current={currentPage}
          total={filteredSearchData.length}
          pageSize={itemsPerPage}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          className="flex justify-center"
        />
      </div>
    </div>
  );
}
