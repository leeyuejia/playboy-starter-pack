const Content = require('../models/contents-model');

module.exports = {
    async createPun(req, res) {
        const body = req.body

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a Pun'
            })
        }

        const pun = new Content({
            username: req.user.username,
            content: body.content,
            caption: body.caption,
            contentType: 'Pun'
        });

        if (!pun) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        try {
            await pun.save();
            return res.status(201).json({
                success: true,
                id: pun._id,
                message: 'Pun created!'
            })
        } catch (err) {
            return res.status(400).json({
                err,
                message: 'Pun not created!'
            })
        }
    },
    async getPuns(req, res) {
        try {
            await Content.find({ contentType: 'Pun' }, (err, puns) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }

                if (!puns.length) {
                    return res
                        .status(404)
                        .json({ success: false, error: `Pun not found` })
                }

                return res.status(200).json(puns)
            })
        } catch (err) {
            console.log(err)
        }
    },
    async getPunById(req, res) {
        try {
            await Content.findOne({ _id: req.params.id }, (err, pun) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
    
                if (!pun) {
                    return res
                        .status(404)
                        .json({ success: false, error: `Pun not found` })
                }
                return res.status(200).json(pun)
            })
        } catch (err) {
            console.log(err)
        }
    },
    async getPunsByUsername(req, res) {
        try {
            await Content.find({ username: req.params.username, contentType: 'Pun' }, (err, pun) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
    
                if (!pun) {
                    return res
                        .status(404)
                        .json({ success: false, error: `Pun not found` })
                }
                return res.status(200).json(pun)
            })
        } catch (err) {
            console.log(err)
        }
    },
    updatePun(req, res) {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update'
            })
        }

        Content.findOne({ _id: req.params.id }, async (err, pun) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Pun not found!'
                })
            }

            pun.caption = body.caption;
            pun.likes = body.likes;

            try {
                await pun.save();
                return res.status(200).json({
                    success: true,
                    id: pun._id,
                    message: 'Pun updated!'
                })
            } catch (err) {
                return res.status(400).json({
                    err,
                    message: 'Pun not updated!'
                })
            }
        })
    },
    async deletePun(req, res) {
        try {
            await Content.findOneAndDelete({ _id: req.params.id }, (err, pun) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    })
                }

                if (!pun) {
                    return res.status(404).json({
                        success: false,
                        error: 'Pun not found'
                    })
                }

                return res.status(200).json({
                    success: true,
                    data: pun
                })
            })
        } catch (err) {
            console.log(err)
        }
    },
    async createPunComment (req,res) {
        const body = req.body; 
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to create comment'
            })
        }
        Content.findOneAndUpdate(
            { _id:req.params.id, contentType: 'Pun'},
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