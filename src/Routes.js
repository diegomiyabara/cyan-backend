const express = require("express");
const router = express.Router();

const UserAuth  = require("./Controllers/UserAuth");
const MillsController = require("./Controllers/Mills");
const HarvestsController = require("./Controllers/Harvests")
const FarmsController = require("./Controllers/Farms")
const FieldsController = require("./Controllers/Fields")

router.post("/login", UserAuth.login)
router.post("/signup", UserAuth.signUp)

router.get("/mills", UserAuth.auth, MillsController.all)
router.post("/mills", UserAuth.auth, MillsController.create)
router.delete("/mills", UserAuth.auth, MillsController.delete)

router.get("/harvests", UserAuth.auth, HarvestsController.all)
router.post("/harvests", UserAuth.auth, HarvestsController.create)
router.delete("/harvests", UserAuth.auth, HarvestsController.delete)

router.get("/farms", UserAuth.auth, FarmsController.all)
router.post("/farms", UserAuth.auth, FarmsController.create)
router.delete("/farms", UserAuth.auth, FarmsController.delete)

router.get("/fields", UserAuth.auth, FieldsController.all)
router.post("/fields", UserAuth.auth, FieldsController.create)
router.delete("/fields", UserAuth.auth, FieldsController.delete)

module.exports = router;