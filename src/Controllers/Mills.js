const Mill = require("../Database/Models/Mill")
const jwt = require("jsonwebtoken");
const {Bearer} = require('permit');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const permit = new Bearer();

const Mills = {
    all(req, res, next) {
        const name = req.query.name;
        
        if(name) {
            Mill.findAll({
                where: {
                    name: {
                        [Op.substring]: `${name}`
                    }
                }
            })
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(400).json({message: error.message})
            });
        } else {
            Mill.findAll()
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(400).json({message: error.message})
            });
        }
        
    },

    create(req, res, next) {
        const { name } = req.body;
        const token = permit.check(req)
        const user  = jwt.decode(token)
        
        if(!name || !user){
            res.status(400).json({message: "All inputs must be filled!"})
        }

        Mill.create({
            name,
            userId: user.userId
        })
        .then((result) => {
            res.status(201).json({Message: `Mill ${result.name} successfully registered!`});
            })
        .catch((error) => {
            res.status(400).json({message: error.message})
        })
        ;
    },

    delete(req,  res, next) {
        const millId = req.body.millId

        if(!millId) {
            res.status(400).json({message: "You must inform an valid Id"})
        }

        try {
            Mill.destroy({
                where:{
                    id: millId
                }
            })
            .then(() => {
                res.status(200).json({message: "Mill deleted successfully!"})
            })
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
};

module.exports = Mills;