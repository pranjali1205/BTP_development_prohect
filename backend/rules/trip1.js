const mongoose = require("mongoose");
const router = require("express").Router();
const Transportation = require("../dataclass/Trip1");

router.post("/api/trip1", async (req, res) => {

  const newdata = new Transportation(req.body);
  try {

    const result = await Transportation.create(newdata);
          res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router
