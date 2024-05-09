import { Socket } from "socket.io";

interface Global {
  onlineUser: Map<number, string>; // Replace 'any' with specific types if known
  chatSocket: Socket;
}

declare const global: Global

export default global;