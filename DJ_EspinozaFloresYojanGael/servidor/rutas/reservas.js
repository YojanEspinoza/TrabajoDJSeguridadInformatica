const express = require("express")
const proteger = require("../middlewares/auth")
const { crear, listar } = require("../controladores/reservasCtrl")

const router = express.Router()

router.post("/", crear)
router.get("/", proteger, listar)

module.exports = router
