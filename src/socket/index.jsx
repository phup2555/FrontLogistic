import { io } from "socket.io-client";

const socket = io("https://api.lgstorageservice.com");

socket.on("product_added", (data) => {
  console.log("📦 New product:", data);
});
