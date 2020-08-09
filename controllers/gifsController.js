const Content = require('../models/contents-model');

module.exports = {
    async createGif(req, res) {
        const body = req.body

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a gif'
            })
        }

        const gif = new Content({
            username: req.user.username,
            content: body.content,
            caption: body.caption,
            contentType: 'Gif'
        });

        if (!gif) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        try {
            await gif.save();
            return res.status(201).json({
                success: true,
                id: gif._id,
                message: 'Gif created!'
            })
        } catch (err) {
            return res.status(400).json({
                err,
                message: 'Gif not created!'
            })
        }
    },
    async getGifs(req, res) {
        try {
            await Content.find({ contentType: 'Gif' }, (err, gifs) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }

                if (!gifs.length) {
                    return res
                        .status(404)
                        .json({ success: false, error: `Gif not found` })
                }

                return res.status(200).json(gifs)
            })
        } catch (err) {
            console.log(err)
        }
    },
    async getGifById(req, res) {

        gif.caption = body.caption;
        gif.imgUrl = body.imgUrl;

        try {
            await Content.findOne({ _id: req.params.id }, (err, gif) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
    
                if (!gif) {
                    return res
                        .status(404)
                        .json({ success: false, error: `Gif not found` })
                }
                return res.status(200).json(gif)
            })
        } catch (err) {
            console.log(err)
        }
    },
    async getGifsByUsername(req, res) {
        try {
            await Content.find({ username: req.params.username, contentType: 'Gif' }, (err, gif) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
    
                if (!gif) {
                    return res
                        .status(404)
                        .json({ success: false, error: `Gif not found` })
                }
                return res.status(200).json(gif)
            })
        } catch (err) {
            console.log(err)
        }
    },
    updateGif(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update'
            })
        }

        Content.findOne({ _id: req.params.id }, async (err, gif) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Gif not found!'
                })
            }

            gif.caption = body.caption;
            gif.likes = body.likes;

            try {
                await gif.save();
                return res.status(200).json({
                    success: true,
                    id: gif._id,
                    message: 'Gif updated!'
                })
            } catch (err) {
                return res.status(400).json({
                    err,
                    message: 'Gif not updated!'
                })
            }
        })
    },
    async deleteGif(req, res) {
        try {
            await Content.findOneAndDelete({ _id: req.params.id }, (err, gif) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    })
                }

                if (!gif) {
                    return res.status(404).json({
                        success: false,
                        error: 'Gif not found'
                    })
                }

                return res.status(200).json({
                    success: true,
                    data: gif
                })
            })
        } catch (err) {
            console.log(err)
        }
    },
    async createGifComment (req,res) {
        const body = req.body; 
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to create comment'
            })
        }
        Content.findOneAndUpdate(
            { _id:req.params.id, contentType: 'Gif'},
            {
                $push:{
                    comments: {
                        commentedBy : body.currentUser,
                        description : body.comment
                    }
                }
            },
            async (err,result) => {
                console.log(result)
                if(err) {
                    return res.status(404).json({
                        err,
                        message: `unable to post comment due to ${err.message}`
                    })
                }
                try {
                    await result.save();
                    return res.status(200).json({
                        success:true,
                        id: result._id,
                        message: 'comment posted'
                    })
                } catch (err) {
                    return res.status(400).json({
                        err,
                        message :`unable to post comment due to ${err.message}`
                    })
                }
            });
    },
}