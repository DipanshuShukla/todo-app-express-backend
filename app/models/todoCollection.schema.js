const { default: mongoose } = require("mongoose");

const todoCollectionSchema = mongoose.Schema(
    {
        title: {
            type: String,
            default: "",
        },
        todoList: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Todo",
                },
            ],

            default: [],
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("TodoCollection", todoCollectionSchema);
