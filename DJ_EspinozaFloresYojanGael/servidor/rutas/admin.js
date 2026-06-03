const express = require("express")
const { login } = require("../controladores/adminCtrl")

const router = express.Router()

router.post("/login", login)

module.exports = router
