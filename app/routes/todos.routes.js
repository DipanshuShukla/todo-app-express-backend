const express = require("express");
const controller = require("../controllers/todos.controller");
const validateJWT = require("../middleware/jwtValidator.middleware");

const todosRouter = express.Router();

todosRouter.get("/", validateJWT, controller.getAllTodoCollections);
todosRouter.post("/", validateJWT, controller.createTodoCollection);
todosRouter.get(
    "/:collectionId",
    validateJWT,
    controller.getTodoCollectionById
);
todosRouter.put(
    "/:collectionId",
    validateJWT,
    controller.updateTodoCollectionById
);
todosRouter.delete(
    "/:collectionId",
    validateJWT,
    controller.deleteTodoCollectionById
);

todosRouter.post("/:collectionId", validateJWT, controller.createTodo);
todosRouter.delete(
    "/:collectionId/:todoId",
    validateJWT,
    controller.deleteTodoById
);
todosRouter.put(
    "/:collectionId/:todoId",
    validateJWT,
    controller.updateTodoById
);

module.exports = todosRouter;
