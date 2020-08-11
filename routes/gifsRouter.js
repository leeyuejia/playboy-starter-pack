const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const GifsController = require('../controllers/gifsController');


router.post('/gif', ensureAuthenticated, GifsController.createGif);
router.get('/gifs', ensureAuthenticated, GifsController.getGifs);
router.get('/gif/:id', ensureAuthenticated, GifsController.getGifById);
router.get('/gifs/:username', ensureAuthenticated, GifsController.getGifsByUsername);
router.put('/gif/:id', ensureAuthenticated, GifsController.updateGif);
router.delete('/gif/:id', ensureAuthenticated, GifsController.deleteGif);
router.put('/gif/:id', ensureAuthenticated, GifsController.editGif);

module.exports = router;