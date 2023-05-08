const { addMessage, getMessages } = require("../controllers/message.controller");
const router = require("express").Router();

router.post("/add", addMessage);
router.post("/get", getMessages);

module.exports = router;