import Database from "tauri-plugin-sql-api";
export let db:Database|undefined = undefined
    Database.load("sqlite:test.db")
    .then((c)=>{
        db = c
        db.execute("CREATE TABLE IF NOT EXISTS app(id varchar(255)  NOT NULL PRIMARY KEY,icon TEXT, app varchar(255),path varchar(500))")
            .then(c=>console.log(c))
            .catch(c=>console.log(c))
    })

