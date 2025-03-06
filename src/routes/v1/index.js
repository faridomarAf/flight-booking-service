// v1 routes
const express = require('express');
const bookingRoutes = require('./booking-routes');

const {infoController} = require('../../controllers')

const router = express.Router();

router.get('/info', infoController.info);
router.use('/booking', bookingRoutes);

module.exports = router