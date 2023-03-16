const mongodb = require("mongodb");
const db = require("../database/mongodb.config");

class Todo {
  constructor(text, id, time) {
    this.text = text;
    this.id = id;
    this.time = time;
  }

  static async getAll() {
    const todos = await db.getDb().collection("todos").find().toArray();
    return todos.map(function (todo) {
      return new Todo(todo.text, todo._id, todo.time);
    });
  }

  save() {
    if (this.id) {
      const todoId = new mongodb.ObjectId(this.id);
      return db
        .getDb()
        .collection("todos")
        .updateOne(
          { _id: todoId },
          { $set: { text: this.text, time: this.time } }
        );
    } else {
      return db
        .getDb()
        .collection("todos")
        .insertOne({ text: this.text, time: this.time });
    }
  }

  delete() {
    if (!this.id) {
      throw new Error("id가 없는 목록 삭제를 시도하고 있습니다.");
    }
    const todoId = new mongodb.ObjectId(this.id);
    return db.getDb().collection("todos").deleteOne({ _id: todoId });
  }
}
module.exports = Todo;
