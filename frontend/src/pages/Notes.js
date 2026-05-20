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
        "https://notes-app-r8xt.onrender.com/api/notes",
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
        "https://notes-app-r8xt.onrender.com/api/notes",
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
        `https://notes-app-r8xt.onrender.com/api/notes/${id}`,
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
   
