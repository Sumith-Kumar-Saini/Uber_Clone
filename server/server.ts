import app from "./src/app";
import Server from "./src/services/server.service";

const server = new Server(app);
server.start();
