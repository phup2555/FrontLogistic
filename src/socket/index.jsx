import { io } from "socket.io-client";

export const socket = io("https://api.lgstorageservice.com");

socket.on("product_added", (data) => {
  console.log("📦 New product:", data);
});
export default socket;
