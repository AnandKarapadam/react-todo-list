import React from "react";
import { useState, useEffect } from "react";

const Main = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("note");
    return saved ? JSON.parse(saved) : [];
  });

  const [note, setNote] = useState("");

  const [editId, setEditId] = useState(null);

  function handleAddNote() {
    if (note.trim() === "") {
      alert("Text Not Found...!");
      return;
    }

    if (editId !== null) {
      let updatedNote = notes.map((obj) =>
        obj.id === editId ? { ...obj, note: note } : obj,
      );
      setNotes(updatedNote);
      setEditId(null);
    } else {
      let newNote = { id: Date.now(), note: note, isCompleted: false };

      setNotes([...notes,newNote]);
    }
    setNote("");
  }

  function handleToggle(id) {
    const updatedNotes = notes.map((obj) =>
      obj.id === id ? { ...obj, isCompleted: !obj.isCompleted } : obj,
    );
    setNotes(updatedNotes);
  }

  const handleDelete = (id) => {
    const noteToDelete = notes.find((obj) => obj.id === id);
    if (!noteToDelete.isCompleted) {
      alert("Note is not completed yet...!");
      return;
    }

    let newNotes = notes.filter((obj) => {
      return obj.id !== id;
    });
    setNotes(newNotes);
  };

  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 rounded-4">
        <div className="input-group mb-4">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="form-control"
            placeholder="Enter a task..."
          />
          <button onClick={handleAddNote} className="btn btn-primary">
            {editId !== null ? "Update" : "Add"}
          </button>
        </div>
        <ul className="list-group">
          {notes.map((obj) => {
            return (
              <li
                key={obj.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <input
                    type="checkbox"
                    onChange={() => handleToggle(obj.id)}
                    className="form-check-input me-2"
                  />
                  {obj.note}
                </div>
                <div className="d-flex gap-1">
                  <button
                    onClick={() => handleDelete(obj.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setNote(obj.note);
                      setEditId(obj.id);
                    }}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Main;
