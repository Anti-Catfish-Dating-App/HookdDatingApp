const router = require('express').Router();
const Users = require('../db/models/User');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const {email, password} = req.body;
    res.send({token: await Users.authenticate({ email, password })})
  } catch (error) {
    next(error)
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await Users.findByToken(req.headers.authorization))
  } catch (error) {
    next(error)
  }
})
