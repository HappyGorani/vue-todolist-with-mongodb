const mongodb = require("mongodb");
const db = require("../database/mongodb.config");

class Todo {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }

  static async getAll() {
      const todos = await db.getDb().collection("todos").find().toArray();
      console.log(todos)
    return todos.map(function (todo) {
      return new Todo(todo.text, todo._id);
    });
  }

  save() {
    if (this.id) {
        const todoId = new mongodb.ObjectId(this.id);
        console.log(0);
      return db
        .getDb()
        .collection("todos")
        .updateOne({ _id: todoId }, { $set: { text: this.text } });
    } else {
        console.log(1)
        return db.getDb().collection("todos").insertOne({ text: this.text });
        
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
