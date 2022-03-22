const router = require('express').Router();
const { User } = require('../db/models')


router.get('/', async (req, res) => {
    res.render('entries/register')
})

router.post('/new', async (req, res) => {
    const { name, email, password } = req.body
    const newUser = await User.create({name, email, password})
    req.session.userName = newUser.name
    req.session.userId = newUser.id
    
    res.json(newUser) 
})

module.exports = router;