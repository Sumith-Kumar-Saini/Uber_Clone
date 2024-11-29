import app from "./src/app";
import Server from "./src/services/Server";

const server = new Server(app);
server.start();
