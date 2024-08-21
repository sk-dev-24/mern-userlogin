const express = require('express');
const User = require('./models/UserModal');

const router = express.Router();

router.post('/register', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
        const addUser = new User(req.body);
        await addUser.save();
        res.json({ user: addUser });
    }
    else res.json({ user, error: { email: "Email Id already exist" } });
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) res.json({ user, error: { email: "Invalid email" } });
    else if (user.password !== req.body.password) res.json({ user, error: { password: "Invalid password" } });
    else res.json({ user });
});

router.get('/', async (req, res) => {
    const data = await User.find({});
    res.json(data);
});

module.exports = router;