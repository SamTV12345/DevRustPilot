import Database from "tauri-plugin-sql-api";

export const db = await Database.load("sqlite:test.db")
db.execute("CREATE TABLE IF NOT EXISTS app(id varchar(255)  NOT NULL PRIMARY KEY,icon TEXT, app varchar(255),path varchar(500))")
    .then(c=>console.log(c))
    .catch(c=>console.log(c))
