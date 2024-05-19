const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//routes
app.post("/todos", async (req, res) => {
  try {
    const { task_name, description, priority } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (task_name, description, priority) VALUES ($1, $2, $3) RETURNING *',
      [task_name, description, priority]
    );

    res.status(201).json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.status(200).json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

    if (todo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task_name, description, priority } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET task_name = $1, description = $2, priority = $3 WHERE todo_id = $4",
      [task_name, description, priority, id]
    );

    if (updateTodo.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

    if (deleteTodo.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});