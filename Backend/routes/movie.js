const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movie');

router.get('/popular', movieController.getPopularMovies);

router.post('/search', movieController.postSearchMovies);

module.exports = router;