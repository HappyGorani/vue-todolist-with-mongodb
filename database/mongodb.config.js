const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let database;

async function initDb() {
  const client = await MongoClient.connect("mongodb://172.27.0.5:27017");
  // const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("todolist-with-Vue");
}

function getDb() {
  if (!database) {
    throw new Error("데이터베이스가 없습니다..");
  }
  return database;
}
module.exports = {
  initDb: initDb,
  getDb: getDb,
};
