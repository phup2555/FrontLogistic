import React, { useState, useEffect } from "react";
import {
  AddPdData,
  getZone,
  getRow,
  getCheckEmtrpSlot,
} from "../service/Service";
import Swal from "sweetalert2";
import { getUserIdByLocalStorage } from "../utils/roleHelper";
import { Link } from "react-router-dom";

export default function AddStock({ fetchPdData }) {
  const baseurl = "http://27.254.143.210:3000/api/barcode/";
  const user_id = getUserIdByLocalStorage();

  // state เปิด/ปิด modal
  const [visible, setVisible] = useState(false);

  // state ขณะ loading ตอนกดบันทึก
  const [loading, setLoading] = useState(false);

  // state ฟอร์มข้อมูลของพัสดุ
  const [data, setData] = useState({
    pd_customer_name: "",
    pd_customer_No_box: "",
    store: "",
    zone: "",
    row: "",
    location_id: "",
    Sbox: "",
    Doc: "",
    user_id: "",
    action: "",
  });

  const [rooms] = useState([
    { id: "4", name: "01" },
    { id: "5", name: "02" },
    { id: "6", name: "03" },
  ]);

  // state zones, rows, slots ดึงจาก API
  const [zones, setZones] = useState([]);
  const [rows, setRows] = useState([]);
  const [slots, setSlots] = useState([]);

  // เปิด modal
  const handleOpen = () => setVisible(true);

  // ปิด modal + reset form
  const handleClose = () => {
    setVisible(false);
    setData({
      pd_customer_name: "",
      pd_customer_No_box: "",
      store: "",
      zone: "",
      row: "",
      slot: "",
      Sbox: "",
      Doc: "",
      user_id: "",
      action: "",
    });

    // reset dropdown ทั้งหมด
    setZones([]);
    setRows([]);
    setSlots([]);
  };

  // -------------------------------------------
  // เมื่อเลือกห้อง store → ไป fetch zones
  // -------------------------------------------
  useEffect(() => {
    if (data.store) {
      // ดึง zone ตาม room
      getZone(data.store)
        .then((res) => setZones(res.data))
        .catch(() => setZones([]));

      // reset ค่าที่อยู่ภายใต้ห้อง
      setData((prev) => ({ ...prev, zone: "", row: "", slot: "", Sbox: "" }));
      setRows([]);
      setSlots([]);
    } else {
      // ถ้าเคลียร์ห้อง → reset ทุกอย่าง
      setZones([]);
      setRows([]);
      setSlots([]);
      setData((prev) => ({ ...prev, zone: "", row: "", slot: "", Sbox: "" }));
    }
  }, [data.store]);

  // -------------------------------------------
  // เมื่อเลือก zone → ไป fetch rows
  // -------------------------------------------
  useEffect(() => {
    if (data.zone) {
      getRow(data.zone)
        .then((res) => setRows(res.data))
        .catch(() => setRows([]));

      // reset ค่าภายใต้ zone
      setData((prev) => ({ ...prev, row: "", slot: "", Sbox: "" }));
      setSlots([]);
    } else {
      setRows([]);
      setSlots([]);
      setData((prev) => ({ ...prev, row: "", slot: "", Sbox: "" }));
    }
  }, [data.zone]);

  // -------------------------------------------
  // เมื่อเลือก row → fetch slot ว่าง
  // -------------------------------------------
  useEffect(() => {
    if (data.row && data.store && data.zone) {
      getCheckEmtrpSlot(data.store, data.zone, data.row)
        .then((res) => setSlots(res.data))
        .catch(() => setSlots([]));

      setData((prev) => ({ ...prev, slot: "", Sbox: "" }));
    } else {
      setSlots([]);
      setData((prev) => ({ ...prev, slot: "", Sbox: "" }));
    }
  }, [data.row]);
  useEffect(() => {
    if (data.store && data.zone && data.row && data.slot) {
      const roomName = rooms.find((r) => r.id === data.store)?.name || "";
      const sbox = `${roomName}${data.zone}${data.row}${data.slot}`;

      setData((prev) => ({ ...prev, Sbox: sbox }));
    }
  }, [data.slot]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      let updated = { ...prev, [name]: value };

      if (name === "store") {
        // เปลี่ยนห้อง → reset zone, row, slot, Sbox
        updated.zone = "";
        updated.row = "";
        updated.slot = "";
        updated.Sbox = "";
      }

      if (name === "zone") {
        // เปลี่ยน zone → reset row, slot, Sbox
        updated.row = "";
        updated.slot = "";
        updated.Sbox = "";
      }

      if (name === "row") {
        // เปลี่ยน row → reset slot, Sbox
        updated.slot = "";
        updated.Sbox = "";
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...data,
      user_id,
      action: "Add Stock",
    };
    try {
      const res = await AddPdData(payload);

      Swal.fire({
        title: "Success",
        text: "ເພີ່ມຂໍ້ມູນສຳເລັດ!",
        icon: "success",
      });

      fetchPdData();

      handleClose();

      if (res?.barcode) {
        const printConfirm = await Swal.fire({
          title: "ສຳເລັດ",
          text: "ທ່ານຕ້ອງການພິມ Barcode ຫຼື ບໍ່?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "ພິມ",
          cancelButtonText: "ຍົກເລີກ",
          customClass: {
            confirmButton:
              "bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition",
            cancelButton:
              "bg-red-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition",
          },
          buttonsStyling: false,
        });

        if (printConfirm.isConfirmed) {
          const barcodeUrl = `${baseurl}${res.barcode}`;
          console.log({ barcodeUrl });
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          document.body.appendChild(iframe);

          const doc = iframe.contentWindow.document;
          doc.open();
          doc.write(`
      <html>
        <body style="text-align:center;margin-top:40px">
          <img src="${barcodeUrl}" style="width:300px" />
          <br/>
          <span style="font-size:16px;font-family:Arial, sans-serif;">${data.pd_customer_name}</span>
          <br/>
          <span style="font-size:18px;font-family:Arial, sans-serif;">${data.pd_customer_No_box}</span>
          <br/>
          <span style="font-size:16px;font-family:Arial, sans-serif;">S Box: ${data.Sbox}</span>
        </body>
      </html>
    `);
          doc.close();

          iframe.contentWindow.onload = () => {
            iframe.contentWindow.print();
            document.body.removeChild(iframe);
          };
        }
      }
    } catch (err) {
      Swal.fire({
        title: "ຜິດພາດ!",
        text: err.message || "ການເພີ່ມຂໍ້ມູນລົ້ມເຫຼວ",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition"
        onClick={handleOpen}
      >
        + ເພີ່ມພັດສະດຸ
      </button>

      {visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-100 p-8 rounded-xl w-96 shadow-xl">
            <h3 className="text-center text-xl font-semibold mb-6">
              ເພີ່ມຂໍ້ມູນພັດສະດຸ
            </h3>
            {data.store.length > 0 && data.zone.length > 0 && (
              <div className="my-2 w-full rounded-xl">
                <Link
                  to={`/WarehouseMap?room_id=${data.store}&zone=${data.zone}`}
                  target="_blank"
                  className="text-blue-600 underline text-sm"
                >
                  <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 w-full">
                    ເບິ່ງແຜນທີ່ສາງ
                  </button>
                </Link>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">ຊື່ລູກຄ້າ</label>
                <input
                  type="text"
                  name="pd_customer_name"
                  value={data.pd_customer_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="ຊື່ລູກຄ້າ..."
                />
              </div>

              <div>
                <label className="block mb-1">ເລກພັດສະດຸ (No Box)</label>
                <input
                  type="text"
                  name="pd_customer_No_box"
                  value={data.pd_customer_No_box}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="BOX001"
                />
              </div>

              <div>
                <label className="block mb-1">ເລືອກຫ້ອງ</label>
                <select
                  name="store"
                  value={data.store}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">-- ຫ້ອງ --</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {zones.length > 0 && (
                <div>
                  <label className="block mb-1">ໂຊນ</label>
                  <select
                    name="zone"
                    value={data.zone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">-- Zone --</option>
                    {zones.map((z) => (
                      <option key={z.zone} value={z.zone}>
                        {z.zone}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {data.store.length > 0 && data.zone.length > 0 && (
                <div>
                  {/* <label className="block mb-1">ແຖວ (Row)</label> */}
                  <label className="block mb-1">ຊັ້ນ (Layer)</label>
                  <select
                    name="row"
                    value={data.row}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">-- Layer --</option>
                    {rows.map((r) => (
                      <option key={r.row_no} value={r.row_no}>
                        {r.row_no}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {slots.length > 0 && (
                <div>
                  {/* <label className="block mb-1">Slot</label> */}
                  <label className="block mb-1">ແຖວ (Row)</label>
                  <select
                    name="slot"
                    value={data.slot}
                    onChange={(e) => {
                      const selectedSlot = e.target.value;
                      const selectedLocation =
                        slots.find((s) => s.slot_no === selectedSlot)
                          ?.location_id || "";
                      setData((prev) => ({
                        ...prev,
                        slot: selectedSlot,
                        location_id: selectedLocation,
                      }));
                    }}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">-- Row --</option>
                    {slots.map((s) => (
                      <option key={s.location_id} value={s.slot_no}>
                        {s.slot_no}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block mb-1">S Box</label>
                <input
                  type="text"
                  name="Sbox"
                  value={data.Sbox}
                  readOnly
                  className="w-full px-3 py-2 border rounded-md bg-gray-200"
                />
              </div>

              <div>
                <label className="block mb-1">ລາຍລະອຽດ</label>
                <input
                  type="text"
                  name="Doc"
                  value={data.Doc}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="ເລກທີເອກະສານ"
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                >
                  ຍົກເລີກ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "ກຳລັງບັນທຶກ..." : "ບັນທຶກ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
