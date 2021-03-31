// Create Express Router
const express = require('express'),
      router  = express.Router(),
      homeController = require('../controllers/home.controller'),
      eventsController = require('../controllers/events.controller');

// Export Router
module.exports = router;

// Define Our Routes
//Show Home Page Route
router.get("/" , homeController.showHomePage);
// Show Events Route
router.get('/events' , eventsController.showEvents);
// Show Create Route
router.get('/events/create' , eventsController.createEvent);
// Process Create
router.post('/events/create' , eventsController.processCreate);

// Update Route
router.get('/events/:slug/update' , eventsController.updateEvent);
// ProcessUpdate
router.patch('/events/:slug' , eventsController.processUpdate);
// Delete Route 
router.delete('/events/:slug/delete' , eventsController.deleteEvent);
//Single Page Route /events/bootstrap
router.get('/events/:slug' , eventsController.showSingleEvent);