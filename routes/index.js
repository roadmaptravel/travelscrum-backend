const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Roadhack - Trave/Scrum 2020' });
});

module.exports = router;
