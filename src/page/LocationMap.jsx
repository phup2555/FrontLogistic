import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getLocationMap } from "../service/Service";
// import { getLocationMap } from "../service/Service";

export default function WarehouseMap() {
  const [searchParams] = useSearchParams();
  const room_id = searchParams.get("room_id");
  const zone = searchParams.get("zone");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRowLayer = async () => {
    if (!room_id || !zone) return;
    try {
      const res = await getLocationMap(room_id, zone);

      setData(res.data);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRowLayer();
  }, [room_id, zone]);

  if (loading) return <div>Loading...</div>;
  if (!data.length) return <div>ຂໍອະໄພບໍ່ມີຂໍ້ມູນໃນການເບິງແຜນສາງ</div>;

  const rows = [...new Set(data.map((d) => d.row_no))].sort();
  const slots = [...new Set(data.map((d) => d.slot_no))].sort();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 w-full text-center  ">
        ແຜນຜັງ ຫ້ອງ {room_id} ໂຊນ {zone}
      </h2>
      <table className="table-auto border-collapse border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Layer/Row</th>
            {slots.map((slot) => (
              <th key={slot} className="border px-2 py-1">
                {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <td className="border px-2 py-1 font-bold">{row}</td>
              {slots.map((slot) => {
                const slotData = data.find(
                  (d) => d.row_no === row && d.slot_no === slot
                );
                return (
                  <td
                    key={slot}
                    className={`border px-2 py-1 text-center ${
                      slotData?.status === "OCCUPIED"
                        ? "bg-red-400 text-white"
                        : "bg-green-300"
                    }`}
                  >
                    {slotData?.status === "OCCUPIED" ? "X" : "O"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
