const {Client} =  require('pg')
const express = require('express')
const app = express()
const client = new Client({
    user: "postgres",
    password:"admin",
    host:"localhost",
    port: 5432,
    database: "todo"
})

app.get("/todos", async (req, res) => {
    const rows = await readTodos();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.listen(8000, ()=> console.log("web server is listening"))

start()
async function start() {
    await connect();
    /*
    const todos = await readTodos();
    console.log(todos)

    const successCreate = await createTodo();
    console.log(`Creating was ${successCreate}`)

    const successDelete = await deleteTodo(1)
    console.log(`Deleting was ${successDelete}`)
    */
}

async function connect() {
    try {
        await client.connect()
        console.log('connect successfully');
    } catch (e) {
        console.error(`Failed to connect ${e}`)
    }
}

async function readTodos() {
    try {
        const result = await client.query("select id, text from todos");
        return result.rows;
    } catch (error) {
        return [];
    }
}

async function createTodo() {
    try {
        await client.query("insert into todos values ($1, $2)",[1, 'read book']);
        return true;
    } catch (e) {
        return false;
    }

}

async function deleteTodo(id) {
    try {
        await client.query("delete from todos where id = $1", [id]);
        return true
    } catch (e) {
        return false
    }
}
