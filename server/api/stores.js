const router = require('express').Router();
const { Stores } = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const stores = await Stores.findAll();

    res.send(stores);
  } catch (ex) {
    next(ex);
  }
});
