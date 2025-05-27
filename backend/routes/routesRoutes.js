const express = require('express');
const router = express.Router();
const routeControllers = require('../controllers/routeControllers');

router.get('/routes', routeControllers.getAllRoutes);

module.exports = router;
