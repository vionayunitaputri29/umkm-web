const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Route: Registrasi Pengguna Baru
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const UserExists = await user.findOne({ $or: [{ username }, { email }] });
        if (userExists) return res.status(400).json({ message: 'Username/Email sudah terdaftar' });

        const user = new User({ username, email, password, role });
        await user.save();
        res.status(201).json({ message: 'Registrasi berhasil' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route: Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Username atau Password salah' });
        }

        // Buat Token JWT
        const token = jwt.sign({ id: user_id, role: user.role }, process.env.JWT_SECRET || 'secretkey123', { expiresIn: '1d' });
        res.json({
            token, user: { id: user_id, username: user.username, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;