const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const GeneralController = require('../controllers/generalController');


router.post(
    '/:id/comment', 
    ensureAuthenticated, 
    GeneralController.postComment
    );

router.get(
    '/content/:id',
    ensureAuthenticated,
    GeneralController.getOneContent
    );

module.exports = router;