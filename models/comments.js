const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: [{
        type: String,
        required: true
    }, {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: true

    }]
});

module.exports = mongoose.model('Comment', CommentSchema)