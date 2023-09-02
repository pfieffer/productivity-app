const express = require("express");

const {
    getActivities,
    addActivity,
} = require("../controllers/activity.controller");

const router = express.Router();
const auth = require("../middleware/auth");

/* Creating a route for the get request. */
router.get("/activities", auth, getActivities);
/* Creating a route for the post request. */
router.post("/activity", auth, addActivity);

module.exports = router;