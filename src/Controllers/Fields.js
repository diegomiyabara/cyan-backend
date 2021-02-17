const Field = require("../Database/Models/Field")
const jwt = require("jsonwebtoken");
const {Bearer} = require('permit');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const permit = new Bearer();

const Fields = {
    all(req, res, next) {
        const {code} = req.body;
        
        if(code) {
            Field.findAll({
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
            Field.findAll()
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(400).json({message: error.message})
            });
    },

    create(req, res, next) {
        const { code, latitude, longitude, farmId } = req.body;
        const token = permit.check(req)
        const user  = jwt.decode(token)
        
        if(!code || !latitude  || !longitude ){
            res.status(400).json({message: "All inputs must be filled!"})
        }

        Field.create({
            code,
            latitude,
            longitude,
            farmId
        })
        .then((result) => {
            res.status(201).json({Message: `Field code ${result.code} successfully registered!`});
            })
        .catch((error) => {
            res.status(400).json({message: error.message})
        })
        ;
    },

    delete(req, res, next) {
        const fieldId = req.body.fieldId

        if(!fieldId) {
            res.status(400).json({message: "You must inform an valid Id"})
        }

        try {
            Field.destroy({
                where:{
                    id: fieldId
                }
            })
            .then(() => {
                res.status(200).json({message: "Field deleted successfully!"})
            })
            .catch((error) => {
                res.status(400).json({message: error.message})
            })
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
};

module.exports = Fields;