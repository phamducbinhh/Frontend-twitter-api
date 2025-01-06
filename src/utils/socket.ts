import envConfig from "@/configs/env";
import { io } from "socket.io-client";

const socket = io(envConfig.NEXT_PUBLIC_API_ENDPOINT);

export default socket;
