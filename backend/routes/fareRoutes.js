const express = require('express');
const router = express.Router();
const { getFare } = require('../controllers/fareController');

router.get('/fare', getFare);

module.exports = router;
