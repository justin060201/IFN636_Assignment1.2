const Project = require('../models/Project')

const createProject = async (req, res) => {
    try {
        const {title , description, budget, deadline} = req.body;

        const project = await Project.create({
            title,
            description,
            budget,
            deadline,
            client: req.user.id
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//TO DO: read, update delete project
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('client', 'name email');
        res.status(200).json(projects);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateProject = async (req, res) => {
    try{
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.client.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to update this project' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
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
    deleteProject
};