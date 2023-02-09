import Database from "tauri-plugin-sql-api";
export let db:Database|undefined = undefined
    Database.load("sqlite:test.db")
    .then((c)=>{
        db = c
        db.execute("CREATE TABLE IF NOT EXISTS app(id varchar(255)  NOT NULL PRIMARY KEY,icon TEXT, app varchar(255),path varchar(500))")
            .then(c=>console.log(c))
            .catch(c=>console.log(c))
    })

export const deleteAppFromDatabase = (id:string)=>{
    if(!db){
        return new Promise((resolve,reject)=>{
            reject("Database not loaded")
        })
    }
    db.execute("DELETE FROM app WHERE id=?",[id])
}

export const updateAppInDatabase = (id:string,icon:string,app:string,path:string)=>{
    if(!db){
        return new Promise((resolve,reject)=>{
            reject("Database not loaded")
        })
    }
    console.log(id)
    return db.execute("UPDATE app SET icon=?,app=?,path=? WHERE id=?",[icon,app,path,id])
}
