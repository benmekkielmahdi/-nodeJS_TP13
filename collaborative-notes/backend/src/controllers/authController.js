import { User } from '../models/user.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ success: false, message: 'Email déjà utilisé' });
        const user = await User.create({ name, email, password });
        const token = user.getSignedJwtToken();
        res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: 'Email et password requis' });
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.matchPassword(password))) return res.status(401).json({ success: false, message: 'Identifiants invalides' });
        const token = user.getSignedJwtToken();
        res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, data: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
