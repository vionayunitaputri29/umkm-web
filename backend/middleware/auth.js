const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('X-auth-token');
    if (!token) return res.status(401).json({ message: 'Akses ditolak, token tidak ada ' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey123');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token tidak valid' });
    }
};

const admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses khusus Admin!' });
    }
    next();
};

module.exports = { auth, admin };