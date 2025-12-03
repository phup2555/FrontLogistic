import React, { useState, useRef } from "react";
import { Modal, Form, Input, DatePicker, Button, message } from "antd";
import dayjs from "dayjs";
import { AddPdData } from "../service/Service";
import Swal from "sweetalert2";

export default function AddStock({ fetchPdData }) {
  const baseurl = "http://localhost:4000/public";
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState({
    name: "",
    Cus_no_box: "",
    Sbox: "",
    Doc: "",
    store: "",
  });
  const handleOpen = () => setVisible(true);
  const handleClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const handlePrint = (barcodeUrl) => {
    // สร้าง iframe ซ่อนไว้สำหรับพิมพ์
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <html>
        <head>
          <title>Print Barcode</title>
          <style>
            body { 
              text-align: center; 
              margin-top: 50px; 
            }
            img { 
              width: 800px;
              height: auto;
            }
          </style>
        </head>
        <body>
          <img src="${barcodeUrl}" alt="Barcode" />
        </body>
      </html>
    `);
    iframeDoc.close();

    // รอให้รูปภาพโหลดเสร็จก่อนพิมพ์
    iframe.contentWindow.onload = () => {
      setTimeout(() => {
        iframe.contentWindow.print();
        // ลบ iframe หลังจากพิมพ์เสร็จ
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    };
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await AddPdData(data);
      message.success("ເພີ່ມຂໍ້ມູນສຳເລັດ!");
      handleClose();
      fetchPdData();

      if (res && res.barcode) {
        Swal.fire({
          title: "ສຳເລັດ",
          text: "ທ່ານຕ້ອงການພິມ Barcode ຫຼື ບໍ່?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "ພິມ",
          cancelButtonText: "ຍົກເລີກ",
          buttonsStyling: false, // ปิด style default ของ Swal2
          didOpen: () => {
            // ปรับ container popup
            const popup = document.querySelector(".swal2-popup");
            popup.className =
              "swal2-popup bg-white shadow-2xl rounded-xl p-6 w-96 max-w-full";
            const footer = document.querySelector(".swal2-actions");
            footer.className = "swal2-actions flex justify-between w-full mt-6";
            const confirmBtn = document.querySelector(".swal2-confirm");
            const cancelBtn = document.querySelector(".swal2-cancel");

            confirmBtn.className =
              "swal2-confirm bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors";
            cancelBtn.className =
              "swal2-cancel bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors";
          },
        }).then((result) => {
          if (result.isConfirmed) {
            const barcodeUrl = `${baseurl}${res.barcode}`;
            handlePrint(barcodeUrl);
          }
        });
      }
    } catch (error) {
      console.error("Error adding stock:", error);
      message.error("ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        style={{ backgroundColor: "#928E85", borderColor: "#928E85" }}
        onClick={handleOpen}
      >
        + ເພີ່ມພັດສະດຸ
      </Button>

      <Modal
        title="ເພີ່ມຂໍ້ມູນພັດສະດຸ"
        open={visible}
        onCancel={handleClose}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={(_, allValues) => setData({ ...data, ...allValues })}
          className="mt-2"
        >
          <Form.Item
            label="ຊື່ລູກຄ້າ"
            name="name"
            rules={[{ required: true, message: "ກະລຸນາໃສ່ຊື່ລູກຄ້າ" }]}
          >
            <Input placeholder="ຊື່ລູກຄ້າ..." />
          </Form.Item>

          <Form.Item
            label="ເລກພັດສະດຸ (No Box)"
            name="Cus_no_box"
            rules={[{ required: true, message: "ກະລຸນາໃສ່ເລກພັດສະດຸ" }]}
          >
            <Input placeholder="ເຊັ່ນ BOX001" />
          </Form.Item>

          <Form.Item
            label="ເລກພັດສະດຸ (S Box)"
            name="Sbox"
            rules={[{ required: true, message: "ກະລຸນາໃສ່ເລກSbox" }]}
          >
            <Input placeholder="ເຊັ່ນ SOX001" />
          </Form.Item>

          <Form.Item
            label="ລາຍລະອຽດ"
            name="Doc"
            rules={[{ required: true, message: "ກະລຸນາລະບຸລາຍລະອຽດ" }]}
          >
            <Input placeholder="ເລກທີເອກະສານ" />
          </Form.Item>

          <Form.Item
            label="ໂຊນຈັດເກັບ"
            name="store"
            rules={[{ required: true, message: "ກະລຸນາລະບຸໂຊນຈັດເກັບ" }]}
          >
            <Input placeholder="AX..." />
          </Form.Item>

          <Form.Item className="text-right">
            <Button onClick={handleClose} className="mr-2">
              ຍົກເລີກ
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-blue-500 hover:bg-blue-600"
            >
              ບັນທຶກ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
