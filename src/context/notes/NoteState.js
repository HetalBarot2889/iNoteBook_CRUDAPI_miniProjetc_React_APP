import NoteContext from "../notes/noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesIntials = [];

  const [notes, setNotes] = useState(notesIntials);
  //const update = () => {}

  //Get All Notes
  const getAllNotes = async () => {
      const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json)
  }
  
  //Add aNotes
  const addNotes = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });

    const note1 = await response.json();
    setNotes(notes.concat(note1));
  }

  //Delete a Notes 
  const deleteNotes = async (id) => {
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);

    //API CALL
    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({id}),
    });
    const json = await response.json();
    console.log(json)
  }

  //Edit a Notes 
  const editNotes = async (id,title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
       //Logic to Client.
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, addNotes, deleteNotes, editNotes, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;