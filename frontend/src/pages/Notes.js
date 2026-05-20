import { useEffect, useState } from "react";
import axios from "axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        "https://notes-app-r8xt.onrender.com/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addNote = async () => {
    try {
      await axios.post(
        "https://notes-app-r8xt.onrender.com/api/notes",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `https://notes-app-r8xt.onrender.com/api/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>My Notes</h2>

      <button onClick={logout}>Logout</button>

      <br /><br />

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={addNote}>Add</button>

      <hr />

      {notes.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <button onClick={() => deleteNote(note._id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}
