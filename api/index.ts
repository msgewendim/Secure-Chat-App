import express from "express";
import userRoute from "./routes/userRoutes";
import messageRoute from "./routes/messageRoutes";
import passwordRoute from "./routes/passwordRoutes";
import cors, { CorsOptions } from "cors";
import activityLogger from "./utils/middlewares/activityLogger";
import dotenv from "dotenv";
import connectToDB from "./utils/DB/MongoDB/MongoDB";
import { Server, Socket } from "socket.io";
import global from "./utils/interfaces/global";
dotenv.config();

const PORT = process.env.PORT;
export const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://secure-chat-app-msganaw.netlify.app",
];

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (!requestOrigin) return callback(null, true);
    if (allowedOrigins.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true, // if need to include credentials like cookies in the requests
};

// middlewares
app.use(express.json()); // to accept json data
app.use(cors(corsOptions)); // to allow cors
app.use(activityLogger); // to log activity

// routes
app.use("/api/users", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/password", passwordRoute);

// connect to mongoDB and PostgresDB
connectToDB();

export const server = app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});

// SOCKET.IO HANDLER
global.onlineUser = new Map();

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  console.log("a user connected");
  global.chatSocket = socket;

  socket.on("add-user", (userId: number) => {
    // io.emit('add-user', userId);
    global.onlineUser.set(userId, socket.id);
  });

  socket.on("send-message", (data: any) => {
    console.log(data);
    const sendUserSocket = global.onlineUser.get(data.receiver);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("receive-message", data.message);
    }
  });

  socket.on("logout", () => {
    console.log("user disconnected");
  });
});
