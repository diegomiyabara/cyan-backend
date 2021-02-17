const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Bearer } = require("permit");

const User = require("../Database/Models/User");

const permit = new Bearer();

module.exports = {
    login(req, res, next) {
        const { username, password } = req.body;
    
        User.findOne({
            where: {
            username: username,
            },
        }).then((user) => {

            if (!user) {
                return res.status(401).json({ error: "username not found" });
            }
            if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "invalid password" });
            }
    
            let jwtPayload = { username: user.username, userId: user.id }; 
            let token = jwt.sign(jwtPayload, process.env.JWT_SECRET); 
    
            return res.status(200).json({ token });
        });
    },

    auth(req, res, next) {
        const token = permit.check(req);

        if (!token) {
            permit.fail(res);
            return res.status(401).json({ error: "authentication required!" });
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                permit.fail(res);
                return res.status(401).json({ error: "failed to authenticate token!" });
            }

            req.username = decoded.username;
            next();
        });
    },

    signUp(req, res, next) {
        const {username, password}  = req.body;

        try {
            if (username.length > 3 && password.length >= 6){
                User.create({
                    username,
                    password: bcrypt.hashSync(password, 10)
                })
    
                return res.status(200).json({message: `User ${username} successfully registered!`})
            }
            else {
                return res.status(500).json({message: `Username must have at least 3 characteres and password at least 6 characters.`})
            }
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
};