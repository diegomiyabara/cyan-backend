const Harvest = require("../Database/Models/Harvest")
const jwt = require("jsonwebtoken");
const {Bearer} = require('permit');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const permit = new Bearer();

const Harvests = {
    all(req, res, next) {
        const {startDate, endDate, code, millId} = req.query;
        
        if(startDate && endDate) {
            Harvest.findAll({
                where: {
                    startDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    millId: millId,
                },
            })
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(400).json({message: error.message})
            });
        }
        if(code) {
            Harvest.findAll({
                where: {
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
            Harvest.findAll({
                where: {
                    millId
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
        const { code, startDate, endDate } = req.body;
        const millId = req.query.millId
        const token = permit.check(req)
        const user  = jwt.decode(token)
        
        if(!code || !startDate  || !endDate || !millId){
            res.status(400).json({message: "All inputs must be filled!"})
        }

        Harvest.create({
            code,
            startDate,
            endDate,
            millId
        })
        .then((result) => {
            res.status(201).json({Message: `Harvest ${result.code} successfully registered!!`});
            })
        .catch((error) => {
            res.status(400).json({message: error.message})
        })
        ;
    },

    delete(req, res, next) {
        const harvestId = req.body.harvestId

        if(!harvestId) {
            res.status(400).json({message: "You must inform an valid Id"})
        }

        try {
            Harvest.destroy({
                where:{
                    id: harvestId
                }
            })
            .then(() => {
                res.status(200).json({message: "Harvest deleted successfully!"})
            })
            .catch((error) => {
                res.status(400).json({message: error.message})
            })
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
};

module.exports = Harvests;