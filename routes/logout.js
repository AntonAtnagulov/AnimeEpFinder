const router = require('express').Router();
const {User} = require('../db/models')

router.get('/', async (req, res) => {
    if (req.session.userId) {
      await req.session.destroy();
      res.clearCookie('MyCookieName');
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });

module.exports = router;