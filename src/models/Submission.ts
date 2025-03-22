import mongoose from "mongoose";
const submissionSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Form"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" // Assuming a User model exists
    },
    responses: [
        {
            fieldId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Field"
            },
            value: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            }
        }
    ],
    submittedAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
}
);

const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
