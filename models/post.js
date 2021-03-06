const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date

    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false
    },
    summary: {
        type: String,
        required: true
    },


    subreddit: [{
        type: String,
        require: true
    }, {
        type: String
    }, {
        type: String
    }, {
        type: String
    }, {
        type: String
    }],



    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
});

PostSchema.pre('save', next => {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();

});


module.exports = mongoose.model("Post", PostSchema);