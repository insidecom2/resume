const express = require('express');
const router = express.Router();

// index page
router.get('/', function (req, res) {
    res.render('pages/index');
});

module.exports = router;