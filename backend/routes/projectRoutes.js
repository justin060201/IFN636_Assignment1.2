const express = require('express');
const router = express.Router();
const fs = require('fs');
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

    const uploadPath = path.resolve(__dirname, '../uploads');
    

    console.log('📂 [Multer] tryin to save in ：', uploadPath);


    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      console.log('[Multer]File is not exist！');
    }
    
    cb(null, uploadPath);
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