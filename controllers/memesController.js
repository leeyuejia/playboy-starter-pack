const Content = require('../models/contents-model');

module.exports = {
    async createMeme(req, res) {
        const body = req.body

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a meme'
            })
        }

        const meme = new Content({
            username: req.user.username,
            content: body.content,
            caption: body.caption,
            contentType: 'Meme'
        });

        if (!meme) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        try {
            await meme.save();
            return res.status(201).json({
                success: true,
                id: meme._id,
                message: 'Meme created!'
            })
        } catch (err) {
            return res.status(400).json({
                err,
                message: 'Meme not created!'
            })
        }
    },
    async getMemes(req, res) {
        try {
            await Content.find({ contentType: 'Meme'}, (err, memes) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }

                if (!memes.length) {
                    return res
                        .status(404)
                        .json({ success: false, error: `Meme not found` })
                }

                return res.status(200).json(memes)
            })
        } catch (err) {
            console.log(err)
        }
    },
    async getMemeById(req, res) {
        try {
            await Content.findOne({ _id: req.params.id }, (err, meme) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
    
                if (!meme) {
                    return res
                        .status(404)
                        .json({ success: false, error: `Meme not found` })
                }
                return res.status(200).json(meme)
            })
        } catch (err) {
            console.log(err)
        }
    },
    async getMemesByUsername(req, res) {
        try {
            await Content.find({ username: req.params.username, contentType: 'Meme' }, (err, meme) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
    
                if (!meme) {
                    return res
                        .status(404)
                        .json({ success: false, error: `Meme not found` })
                }
                return res.status(200).json(meme)
            })
        } catch (err) {
            console.log(err)
        }
    },
    updateMeme(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update'
            })
        }
        Content.findOne({ _id: req.params.id }, async (err, meme) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Meme not found!'
                })
            }

            meme.content = body.content;
            meme.caption = body.caption;
            meme.likes = body.likes;

            try {
                await meme.save();
                return res.status(200).json({
                    success: true,
                    id: meme._id,
                    message: 'Meme updated!'
                })
            } catch (err) {
                return res.status(400).json({
                    err,
                    message: 'Meme not updated!'
                })
            }
        })
    },
    async deleteMeme(req, res) {
        try {
            await Content.findOneAndDelete({ _id: req.params.id }, (err, meme) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    })
                }

                if (!meme) {
                    return res.status(404).json({
                        success: false,
                        error: 'Meme not found'
                    })
                }

                return res.status(200).json({
                    success: true,
                    data: meme
                })
            })
        } catch (err) {
            console.log(err)
        }
    },
}