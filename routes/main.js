const router = require('express').Router();

router.get('/', async (req, res) => {
    if (req.session.userId) {
        const user = req.session.user
    res.render('entries/mainPage', {user})
    } else {
    res.render('entries/mainPage')
    }
})

module.exports = router;