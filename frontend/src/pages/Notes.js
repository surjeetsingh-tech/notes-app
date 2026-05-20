import { useEffect, useState } from "react";
import axios from "axios";

export default function Notes() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getToken = () => localStorage.getItem("token");

  // FETCH NOTES
  const fetchNotes = async () => {
    try {

      const token = getToken();

      const res = await axios.get(
        "http://localhost:5000/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(res.data);

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ADD NOTE
  const addNote = async () => {
    try {

      const token = getToken();

      await axios.post(
        "http://localhost:5000/api/notes",
        {
          title,
          content,
        },
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
      console.log(err.response?.data || err.message);
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    try {

      const token = getToken();

      await axios.delete(
        `http://localhost:5000/api/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchNotes();

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // LOGOUT
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

      <button onClick={logout}>
        Logout
      </button>

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

      <button onClick={addNote}>
        Add
      </button>

      <hr />

      {notes.map((n) => (
        <div key={n._id}>

          <h3>{n.title}</h3>

          <p>{n.content}</p>

          <button onClick={() => deleteNote(n._id)}>
            Delete
          </button>

          <hr />

        </div>
      ))}

    </div>
  );
}