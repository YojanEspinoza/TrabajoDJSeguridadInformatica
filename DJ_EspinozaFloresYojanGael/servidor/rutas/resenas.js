const express = require("express")
const proteger = require("../middlewares/auth")
const { listar, crear } = require("../controladores/resenasCtrl")

const router = express.Router()

router.get("/", listar)
router.post("/", proteger, crear)

module.exports = router
