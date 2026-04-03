// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers, toggleBanUser } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');


router.get('/users', protect, getAllUsers);
router.put('/ban/:id', protect, toggleBanUser);

module.exports = router;