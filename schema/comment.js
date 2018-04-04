const Schema = require('mongoose').Schema;

/**
 *  userName: 'George James',
 *  roomLink:
 *  avatar: { color: '#1890ff', alif: 'C' },
 *  moment: 1521300207000,
 *  content: '<span style="color: red">12321332</span>',
 *  md: true
 * 
 */

const CommentSchema = new Schema({
    userName: {
        type: String,
        require: true,
    },
    roomLink: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    avatar: Schema.Types.Mixed,
    moment: {
        type: Date,
        default: new Date().getTime(),
    },
    md: {
        type: Boolean,
        default: false,
    }
});

module.exports = CommentSchema;