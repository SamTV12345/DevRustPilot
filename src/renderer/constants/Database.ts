import Database from "tauri-plugin-sql-api";
import {Note} from "../models/Note";
import {Tag} from "../models/Tag";

export let db:Database|undefined = undefined
    Database.load("sqlite:test.db")
    .then((c)=>{
        db = c
        db.execute("CREATE TABLE IF NOT EXISTS app(id varchar(255)  NOT NULL PRIMARY KEY,icon TEXT, app varchar(255),path varchar(500))")
            .then(c=>console.log(c))
            .catch(c=>console.log(c))
        db.execute("CREATE TABLE IF NOT EXISTS note(id varchar(255)  NOT NULL PRIMARY KEY, description TEXT, title text)")
        .then(c=>console.log(c))
        .catch(c=>console.log(c))
        db.execute("CREATE TABLE IF NOT EXISTS tag(id varchar(255)  NOT NULL PRIMARY KEY, tag varchar(255))")
            .then(c=>console.log(c))
            .catch(c=>console.log(c))
        db.execute("CREATE TABLE IF NOT EXISTS link(id varchar(255)  NOT NULL PRIMARY KEY, description TEXT, title text, url text)")
            .then(c=>console.log(c))
            .catch(c=>console.log(c))
        db.execute("CREATE UNIQUE INDEX IF NOT EXISTS tag_index ON tag(tag)")
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

export const addNote = (title: string, description: string)=> {
    if(!db){
        return new Promise((resolve,reject)=>{
            reject("Database not loaded")
        })
    }
    return db.execute("INSERT INTO note (id,description,title) VALUES (?,?,?)",[crypto.randomUUID(),description,title])
}

export const getNotes = async ()=>{
    if(!db){
        return new Promise((resolve,reject)=>{
            reject("Database not loaded")
        })
    }
    return await db.select<Note[]>("SELECT * FROM note")
}


export const updateNote = (id:string,title: string, description: string)=> {
    if(!db){
        return new Promise((resolve,reject)=>{
            reject("Database not loaded")
        })
    }
    return db.execute("UPDATE note SET description=?,title=? WHERE id=?",[description,title,id])
}

export const getTags = async ()=>{
    if(!db){
        return new Promise((resolve,reject)=>{
            reject("Database not loaded")
        })
    }
    return await db.select<Tag[]>("SELECT * FROM tag")
}

export const addTag = (tag: string)=> {
    if(!db){
        return new Promise((resolve,reject)=>{
            reject("Database not loaded")
        })
    }
    const newUUID = crypto.randomUUID()
    return db.execute("INSERT INTO tag (tag, id) VALUES (?,?)",[tag, newUUID])
}


export const deleteNote = (id:string)=>{
    if(!db){
        return new Promise((resolve,reject)=>{
            reject("Database not loaded")
        })
    }
    return db.execute("DELETE FROM note WHERE id=?",[id])
}

export const deleteTag = (tagId:string)=>{
    if(!db){
        return new Promise((resolve,reject)=>{
            reject("Database not loaded")
        })
    }
    return db.execute("DELETE FROM tag WHERE id=?",[tagId])
}

export const updateTag = (tagId:string, newTag:string)=>{
    if(!db){
        return new Promise((resolve,reject)=>{
            reject("Database not loaded")
        })
    }
    return db.execute("UPDATE tag SET tag=? WHERE id=?",[newTag,tagId])
}
