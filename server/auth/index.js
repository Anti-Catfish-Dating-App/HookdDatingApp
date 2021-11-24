const router = require('express').Router();
const Users = require('../db/models/User');


router.post('/login', async (req, res, next) => {
  try {
    console.log("In the login post route");
    const {email, password} = req.body;
    res.send({token: await Users.authenticate({ email, password })})
  } catch (error) {
    next(error)
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await Users.findByToken(req.headers))
  } catch (error) {
    next(error)
  }
})

module.exports = router;
