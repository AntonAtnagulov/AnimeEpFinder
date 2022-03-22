const router = require('express').Router();
const {User} = require('../db/models')

router.get('/', async (req, res) => {
    if (req.session.userId) {
    const user = await User.findOne({where: {id: req.session.userId}, raw: true})
    console.log(user)
    res.render('entries/mainPage', {user})
    } else {
        res.render('entries/mainPage')
    }
})

module.exports = router;