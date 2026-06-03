const express = require("express")
const proteger = require("../middlewares/auth")
const { crear, listar } = require("../controladores/contactoCtrl")

const router = express.Router()

router.post("/", crear)
router.get("/", proteger, listar)

module.exports = router
