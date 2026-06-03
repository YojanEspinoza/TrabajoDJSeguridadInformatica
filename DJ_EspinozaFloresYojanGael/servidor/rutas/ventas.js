const express = require("express")
const proteger = require("../middlewares/auth")
const { listar, crear } = require("../controladores/ventasCtrl")

const router = express.Router()

router.get("/", proteger, listar)
router.post("/", proteger, crear)

module.exports = router
