const express = require('express');
const router = express.Router();
const notic = require('../controllers/notic')
const { login } = require('../controllers/auth')
const { checkAuthenticated , checkUnAuthenticated} = require('../middleware/middleware')


// index page
router.get('/',  function (req, res) {
    res.render('pages/index');
});

router.get('/backoffice', checkUnAuthenticated,login);

router.get('/backoffice/login',checkUnAuthenticated, login);

router.get('/backoffice/notify',checkAuthenticated, async function (req, res) {
    const page = 1;
    const datas = await notic.listNotify(page);
    res.render('pages/notify', {page: page , datas:datas});
});

router.get('/backoffice/notify/:page',checkAuthenticated, async function (req, res) {
    const page = req.params.page;
    const datas = await notic.listNotify(page);
    res.render('pages/notify', {page: page , datas:datas});
});


module.exports = router;