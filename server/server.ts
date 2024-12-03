import app from "./src/app"; // Importing the Express application instance from the app module
import Server from "./src/services/server.service"; // Importing the Server service for managing the server lifecycle

const server = new Server(app); // Creating a new instance of the Server service, passing the Express application instance
server.start(); // Starting the server using the Server service instance
