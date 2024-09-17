const { default: mongoose, model } = require("mongoose");

const todoSchema = mongoose.Schema(
    {
        content: {
            type: String,
            default: "",
        },

        isCompleted: {
            type: Boolean,
            default: false,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
