import { Router } from 'express'; // Importing Express Router for routing
import { IndexController } from '@/controllers/index.controller'; // Importing IndexController for handling root route

// Initialize the Express router for handling routes
const router = Router();

// Define the route for the root URL
router.get("/", IndexController.getHome); // This route is handled by IndexController.getHome

// Export the router to be used in the application
export default router;