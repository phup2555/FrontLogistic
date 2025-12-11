import React, { useState, useEffect } from "react";
import { editProduct } from "../service/Service";
import Swal from "sweetalert2";

const FormEdit = ({ editdata, fetchPdData, popup }) => {
  const [pdData, setPdData] = useState({
    pd_Document: "",
    pd_SBox: "",
    pd_customer_No_box: "",
    pd_customer_name: "",
    pd_store: "",
  });
  console.log({ editdata });
  useEffect(() => {
    if (editdata) setPdData(editdata);
  }, [editdata]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await editProduct(editdata.pd_id, pdData);
      console.log({ res });
      if (res.status === 200) {
        Swal.fire({
          title: "ສຳເລັດ",
          text: res.message,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          position: "top-end",
          toast: true,
        });
        popup(false);
        fetchPdData();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "ການແກ້ໄຂຂໍ້ມູນລົ້ມເຫຼວ",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        toast: true,
      });
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            ແກ້ໄຂຂໍ້ມູນພັດສະດຸ
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">ຊື່ລູກຄ້າ</label>
              <input
                value={pdData.pd_customer_name}
                onChange={(e) =>
                  setPdData({ ...pdData, pd_customer_name: e.target.value })
                }
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="ກະລຸນາປ້ອນຊື່ລູກຄ້າ"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                ເລກພັດສະດຸ (No Box)
              </label>
              <input
                value={pdData.pd_customer_No_box}
                onChange={(e) =>
                  setPdData({ ...pdData, pd_customer_No_box: e.target.value })
                }
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="ກະລຸນາປ້ອນເລກ No Box"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                ເລກພັດສະດຸ (S Box)
              </label>
              <input
                value={pdData.pd_SBox}
                onChange={(e) =>
                  setPdData({ ...pdData, pd_SBox: e.target.value })
                }
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="ກະລຸນາປ້ອນເລກ S Box"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">ໂຊນທີ່ຈັດເກັບ</label>
              <input
                value={pdData.pd_store}
                onChange={(e) =>
                  setPdData({ ...pdData, pd_store: e.target.value })
                }
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="ກະລຸນາປ້ອນເລກ S Box"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => popup(false)}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              ຍົກເລີກ
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
            >
              ຢືນຢັນ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEdit;
