const User = require('../models/User')


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const toggleBanUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'Admin') {
            return res.status(400).json({ message: 'Cannot ban an administrator' });
        }


        user.isBanned = !user.isBanned; 
        await user.save();

        res.status(200).json({ 
            message: `User status updated to: ${user.isBanned ? 'Banned' : 'Active'}`,
            isBanned: user.isBanned 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    toggleBanUser
};