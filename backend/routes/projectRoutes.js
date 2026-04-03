const express = require('express');
const router = express.Router();
const path = require('path');
const {
    createProject,
    getProjects,
    updateProject,
    deleteProject,
    getProjectById
} = require('../controllers/projectController');
const {protect} = require('../middleware/authMiddleware');


const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') 
  },
  filename: function (req, file, cb) {
    
    const ext = path.extname(file.originalname);
    
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });


router.route('/')
    .post(protect, upload.single('file'), createProject)
    .get(protect, getProjects);

router.route('/:id')
    .get(protect, getProjectById)
    .put(protect, upload.single('file'), updateProject)
    .delete(protect, deleteProject);

module.exports = router;