const Farm = require("../Database/Models/Farm")
const jwt = require("jsonwebtoken");
const {Bearer} = require('permit');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const permit = new Bearer();

const Farms = {
    all(req, res, next) {
        const {name, code, harvestId} = req.query;
        
        if(name) {
            Farm.findAll({
                where: {
                    harvestId,
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
        }
        if(code) {
            Farm.findAll({
                where: {
                    harvestId,
                    code: {
                        [Op.substring]: `${code}`
                    }
                }
            })
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(400).json({message: error.message})
            });
        }
            Farm.findAll({
                where: {
                    harvestId
                }
            })
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(400).json({message: error.message})
            });
    },

    create(req, res, next) {
        const { name, code, harvestId } = req.body;
        const token = permit.check(req)
        const user  = jwt.decode(token)
        
        if(!name || !code  || !harvestId ){
            res.status(400).json({message: "All inputs must be filled!"})
        }

        Farm.create({
            name,
            code,
            harvestId
        })
        .then((result) => {
            res.status(201).json({Message: `Farm ${result.name}, code ${result.code} successfully registered!`});
            })
        .catch((error) => {
            res.status(400).json({message: error.message})
        })
        ;
    },

    delete(req, res, next) {
        const farmId = req.body.farmId

        if(!farmId) {
            res.status(400).json({message: "You must inform an valid Id"})
        }

        try {
            Farm.destroy({
                where:{
                    id: farmId
                }
            })
            .then(() => {
                res.status(200).json({message: "Farm deleted successfully!"})
            })
            .catch((error) => {
                res.status(400).json({message: error.message})
            })
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
};

module.exports = Farms;