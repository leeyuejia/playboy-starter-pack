const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const MemesController = require('../controllers/memesController');


router.post('/meme', ensureAuthenticated, MemesController.createMeme);
router.get('/memes', ensureAuthenticated, MemesController.getMemes);
router.get('/meme/:id', ensureAuthenticated, MemesController.getMemeById);
router.get('/memes/:username', ensureAuthenticated, MemesController.getMemesByUsername);
router.put('/meme/:id', ensureAuthenticated, MemesController.updateMeme);
router.delete('/meme/:id', ensureAuthenticated, MemesController.deleteMeme);

module.exports = router;