

const Project = require('../models/Project')

const createProject = async (req, res) => {
    try {
        
        const {title , description, budget, deadline} = req.body;

        
        let filePath = '';
        if (req.file) {
            
            filePath = `/uploads/${req.file.filename}`; 
        }

        const project = await Project.create({
            title,
            description,
            budget: Number(budget), 
            deadline,
            filePath, 
            client: req.user.id
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};




const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            $or: [
                { client: req.user.id },
                { freelancer: req.user.id }
            ]
        }).populate('client', 'name email');
        res.status(200).json(projects);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        const isClient = project.client.toString() === req.user.id;
        const isFreelancer = project.freelancer && project.freelancer.toString() === req.user.id;
        
        if (!isClient && !isFreelancer) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.client.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to update this project' });
        }

        // 1. 整理更新的文字資料
        const updateData = { ...req.body };
        
        // 2. 如果編輯時有上傳新檔案，更新檔案路徑
        if (req.file) {
            updateData.filePath = `/uploads/${req.file.filename}`;
        }

        // 3. 執行更新
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            updateData, // 使用整理過的資料（包含潛在的新檔案路徑）
            { new: true }
        );

        res.status(200).json(updatedProject);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.client.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to delete this project' });
        }

        await project.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject,
    getProjectById
};