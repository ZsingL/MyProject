var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/gg', function(req, res, next) {
  res.send('respond with a resource','gg');
});

module.exports = router;
