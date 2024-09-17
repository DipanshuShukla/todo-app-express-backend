const todoCollectionModel = require("../models/todoCollection.schema");
const todoModel = require("../models/todo.schema");

const getAllTodoCollections = async (req, res) => {
    const userId = req.userId;

    try {
        const todoCollections = await todoCollectionModel.find({ userId });

        // if (!todoCollections || todoCollections.length === 0)
        //     return res.status(201).json({
        //         message: "looks like you don't have any collections yet",
        //     });

        return res.status(200).json(todoCollections);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Oops! something went wrong" });
    }
};

const createTodoCollection = async (req, res) => {
    const userId = req.userId;
    const title = req.body.title || "";

    try {
        const newTodoCollection = await todoCollectionModel.create({
            userId,
            title,
        });

        return res.status(200).json(newTodoCollection);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Oops! something went wrong" });
    }
};

const updateTodoCollectionById = async (req, res) => {
    const userId = req.userId;
    const title = req.body.title || "";
    const id = req.params.collectionId;

    try {
        const newTodoCollection = await todoCollectionModel.findByIdAndUpdate(
            id,
            { title },
            { new: true }
        );

        res.json(newTodoCollection);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Oops! something went wrong" });
    }
};

const getTodoCollectionById = async (req, res) => {
    const userId = req.userId;
    const id = req.params.collectionId;

    try {
        const todoCollection = await todoCollectionModel.findById(id);

        if (!todoCollection)
            return res
                .status(404)
                .json({ message: `Not found todo collection with id: ${id}` });

        res.json(newTodoCollection);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Oops! something went wrong" });
    }
};

const deleteTodoCollectionById = async (req, res) => {
    const id = req.params.collectionId;

    try {
        const deletedTodoCollection =
            await todoCollectionModel.findByIdAndDelete(id);

        if (!deletedTodoCollection)
            return res.status(404).json({
                message: `No Todo Collection found with id: ${id}`,
            });

        res.json(deletedTodoCollection);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Oops! something went wrong" });
    }
};

const createTodo = async (req, res) => {
    const userId = req.userId;
    const { collectionId } = req.params;
    const { content } = req.body;

    try {
        const newTodo = await todoModel.create({
            content,
            userId,
        });

        const todoCollection = await todoCollectionModel.findByIdAndUpdate(
            collectionId,
            { $push: { todoList: newTodo._id } },
            { new: true }
        );

        if (!todoCollection)
            return res.status(404).json({
                message: `No collection found with id: ${collectionId}`,
            });

        return res.json(todoCollection);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Oops! something went wrong" });
    }
};

const updateTodoById = async (req, res) => {
    const { collectionId, todoId } = req.params;
    const { content, isCompleted } = req.body;

    const updatedData = {};
    if (content) updatedData.content = content;
    if (isCompleted) updatedData.isCompleted = isCompleted;

    try {
        const todoCollection = await todoCollectionModel.findById(collectionId);

        if (!todoCollection)
            return res
                .status(404)
                .json(`Non todo colletion found by id: ${collectionId}`);

        const newTodo = await todoModel.findByIdAndUpdate(todoId, updatedData, {
            new: true,
        });

        if (!newTodo)
            return res
                .status(404)
                .json({ message: `No todo found with id: ${todoId}` });

        return res.json(todoCollection);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Oops! something went wrong" });
    }
};

const deleteTodoById = async (req, res) => {
    const { collectionId, todoId } = req.params;

    try {
        const todoCollection = await todoCollectionModel.findByIdAndUpdate(
            collectionId,
            { $pull: { todoList: todoId } },
            { new: true }
        );

        if (!todoCollection)
            return res.status(404).json({
                message: `Not found todo collection with id: ${collectionId}`,
            });

        const todo = await todoModel.findByIdAndDelete(todoId);

        if (!todo)
            return res
                .status(404)
                .json({ message: `Not found todo with id: ${todoId}` });

        return res.json(todoCollection);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Oops! something went wrong" });
    }
};

module.exports = {
    getAllTodoCollections,
    createTodoCollection,
    updateTodoCollectionById,
    deleteTodoCollectionById,
    createTodo,
    getTodoCollectionById,
    updateTodoById,
    deleteTodoById,
};
