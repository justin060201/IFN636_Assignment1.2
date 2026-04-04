
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log('Auto created uploads file');
}


const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/admin', adminRoutes);
app.use(express.urlencoded({ extended: true }));
//app.use('/api/tasks', require('./routes/taskRoutes'));

// Export the app object for testing
if (require.main === module) {
    connectDB();
    // If the file is run directly, start the server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }


module.exports = app
