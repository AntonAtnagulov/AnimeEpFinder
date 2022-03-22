const router = require('express').Router();
const {User} = require('../db/models')

router.get('/', (req, res) => {
    res.render('entries/login')
})

router.post('/', async (req, res) => {
    try {
      const { email, password } = req.body;
      const loginUser = await User.findOne({
        where: { email: email },
        raw: true,
      });
        req.session.user = loginUser.name;
        req.session.userId = loginUser.id;
        res.redirect('/');
    } catch (err) {
      console.log(err);
      res.redirect('/login');
    }
  });

module.exports = router;