const r = require('express').Router();
// const jwt = require('jsonwebtoken');
let currentUser = null;
r.post('/login', (q, s) => {
    console.log("login details: ", q.body);
    if (q.body.email === 'admin@example.com' && q.body.password === 'admin123') {
        currentUser = {
            name: "Admin",
            role: "admin",
        };
        return s.send({
            message: "Admin Login Successful",
            user: currentUser,
        })
        // s.json({ token: jwt.sign({ id: 1 }, process.env.JWT_SECRET), user: { name: 'Admin' } })
    } else if (q.body.email === 'user@example.com' && q.body.password === ' ') {
        currentUser = {
            name: "User",
            role: "user",
        };
        return s.send({
            message: "User Login Successful",
            user: currentUser,
        })
        // s.json({ token: jwt.sign({ id: 1 }, process.env.JWT_SECRET), user: { name: 'User' } })
    } s.sendStatus(401)
});
r.get("/me", (req, res) => {
    if (!currentUser) {
        return res.status(401).json({
            message: "No user logged in",
        });
    }

    res.json(currentUser);
});
module.exports = r; 