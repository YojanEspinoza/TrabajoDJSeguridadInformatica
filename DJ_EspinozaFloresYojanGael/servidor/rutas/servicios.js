const express = require("express")
const proteger = require("../middlewares/auth")
const { listar, crear, editar, eliminar } = require("../controladores/serviciosCtrl")

const router = express.Router()

router.get("/", listar)
router.post("/", proteger, crear)
router.put("/:id", proteger, editar)
router.delete("/:id", proteger, eliminar)

module.exports = router
