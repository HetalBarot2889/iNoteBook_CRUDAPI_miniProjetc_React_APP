import React, { useContext, useState} from 'react'
import noteContex from '../context/notes/noteContext'

export default function AddNotes(props) {
  const context = useContext(noteContex);
  const {addNotes} = context;

  const [note, setNote] = useState({title:"", description:"", tag:""})
  const handleClick = (e) => {
    e.preventDefault();
    addNotes(note.title, note.description,  note.tag);
    setNote({title: "", description: "", tag: ""})
    props.showAlert("Added Notes Successfully","success");
  }
  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <div className='container my-3'>
      <h2>Add Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="title" onChange={onChange} value={note.title} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={note.title.length<5 || note.description.length<5} onClick={handleClick}>ADD NOTE</button>
      </form>
      </div>
    </div>
  )
}
