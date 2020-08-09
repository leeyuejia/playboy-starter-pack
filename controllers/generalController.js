const Content = require('../models/contents-model');

module.exports = {
    async postComment (req,res) {
        const body = req.body; 
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to create comment'
            })
        }
        Content.findOneAndUpdate(
            { _id:req.params.id},
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
            }
        );
    },
    async getOneContent (req,res) {
        try {
            await Content.findOne({ _id: req.params.id }, (err, content) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
    
                if (!content) {
                    return res
                        .status(404)
                        .json({ success: false, error: `content not found` })
                }
                return res.status(200).json(content)
            })
        } catch (err) {
            console.log(err)
        }
    },
    async deleteContent (req,res) {
        try {
            await Content.deleteOne({_id:req.params.id},(err,result) => {
                console.log(result)
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    data: result
                })
            })
        } catch (err) {
            console.log(err)
        }
    }
}