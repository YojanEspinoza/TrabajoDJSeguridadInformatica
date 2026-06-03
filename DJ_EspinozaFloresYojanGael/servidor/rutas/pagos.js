const express = require("express")
const { crearPago } = require("../controladores/pagosCtrl")

const router = express.Router()

router.post("/crear", crearPago)

module.exports = router
