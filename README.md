# Freelance Project Manager System

## 🌟 Project Overview
The **Freelance Project Manager System** is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to streamline the workflow between clients and freelancers. It allows clients to publish projects, specify budgets, set deadlines, and upload essential project briefs or attachments. The system ensures data integrity and security through role-based access and secure file handling.

---

## 🛠️ Tech Stack
* **Frontend**: React.js, Tailwind CSS, Axios.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB Atlas (NoSQL).
* **Authentication**: JSON Web Tokens (JWT).
* **File Storage**: Multer middleware for local/server-side storage.
* **Deployment**: AWS EC2 with PM2 and GitHub Actions for CI/CD.

---

## ✨ Key Features
* **User Authentication**: Secure login and registration with token-based persistence.
* **Project Management**: Full CRUD operations for project lifecycles including Create, Read, Update, and Delete.
* **Attachment Support**: Capability to upload and store project files (images/documents) directly on the server.
* **Role-Based Visibility**: Freelancers and clients only see projects relevant to their specific IDs to ensure data privacy.
* **Automated Deployment**: Seamless updates to AWS EC2 whenever code is pushed to the `main` branch.

---

## ⚙️ Installation & Setup

### 1. Prerequisites
* Node.js (v16+)
* MongoDB Atlas Account
* AWS EC2 Instance

### 2. Backend Configuration
1. Navigate to the `/backend` folder.
2. Install dependencies: `npm install`.
3. Create a `.env` file and add your `MONGO_URI`, `JWT_SECRET`, and `PORT=5001`.
4. Start the server: `npm run dev`.

### 3. Frontend Configuration
1. Navigate to the `/frontend` folder.
2. Install dependencies: `npm install`.
3. Configure `axiosConfig.jsx`:
   * Set `baseURL` to `http://localhost:5001` for local testing.
   * Set `baseURL` to `http://52.65.114.71:5001` for production.
   * Ensure `Content-Type: application/json` is removed or commented out to allow dynamic multipart form-data handling.
4. Launch the app: `npm start`.

---

## 📂 Project Structure

```text
sampleapp_IFQ636_I-Ching-Chang/
├── frontend/              # React.js frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components like TaskForm
│   │   └── axiosConfig.js # Axios instance and interceptor setup
│   └── package.json
├── backend/               # Node.js + Express backend
│   ├── controllers/       # Business logic for project handling
│   ├── models/            # Mongoose schemas (e.g., Project.js)
│   ├── routes/            # Express route definitions
│   ├── uploads/           # Local storage for uploaded files
│   └── server.js          # Entry point for the backend server
└── .github/
    └── workflows/
        └── ci.yml         # GitHub Actions CI/CD pipeline

---

## 🚀 Technical Challenges & Solutions

### Multipart Form-Data Handling
One significant challenge involved the synchronization of file uploads between the React frontend and the Express backend.
* **Problem**: Files were not reaching the server because the global Axios configuration was overriding headers with `application/json`, which suppressed the required boundary strings.
* **Solution**: Removed the hardcoded `Content-Type` in `axiosConfig.jsx`. This allowed the browser to automatically detect the `FormData` object and set the correct `multipart/form-data` boundary, enabling Multer to successfully parse the incoming file stream.

### Automated CI/CD Pipeline
* Utilized **GitHub Actions** to automate the deployment process.
* Upon a push to `main`, the runner connects via SSH to the **AWS EC2** instance, installs new packages, and restarts the application using **PM2** to ensure zero-downtime.

---

## 🌐 Live Demo
* **Public URL**: `http://52.65.114.71:3000`
