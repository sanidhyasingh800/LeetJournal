import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    userId: String, 
    title: String,
    difficulty: String,
    status: String,
    tags: [String],
    notes: String,
    code: String,
    createdAt: {
        type: Date,
        default: new Date()
    },

});

const QuestionMessage = mongoose.model('QuestionMessage', questionSchema);

export default QuestionMessage;

// comment