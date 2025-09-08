const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // serve frontend

// data sementara (simulasi database)
let todos = [];

// GET semua tugas
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// POST tambah tugas
app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Tugas tidak boleh kosong" });
  }
  const newTodo = { id: Date.now(), text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT toggle selesai
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id == id);
  if (!todo) return res.status(404).json({ error: "Todo tidak ditemukan" });

  todo.completed = !todo.completed;
  res.json(todo);
});

// PUT edit tugas
app.put("/api/todos/:id/edit", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const todo = todos.find((t) => t.id == id);
  if (!todo) return res.status(404).json({ error: "Todo tidak ditemukan" });

  if (text && text.trim() !== "") {
    todo.text = text.trim();
  }
  res.json(todo);
});

// DELETE hapus tugas
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id != id);
  res.json({ message: "Todo dihapus" });
});

// jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
