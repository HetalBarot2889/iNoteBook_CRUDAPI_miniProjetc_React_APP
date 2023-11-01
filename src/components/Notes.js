import React, { useContext, useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import noteContex from '../context/notes/noteContext'
import NotItem from './NotItem';
import AddNotes from './AddNotes';

export default function Notes(props) {
  const context = useContext(noteContex);
  const { notes, getAllNotes, editNotes } = context;
  let navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes()
    // eslint-disable-next-line
    }else{
      navigate("/login")
    }
      
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ eID:"", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({eID: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  }

  const handleClick = (e) => {
    editNotes(note.eID, note.etitle, note.edescription, note.etag)
    props.showAlert("Updated Successfully","success");
    refClose.current.click();
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='container'>
        <AddNotes showAlert={props.showAlert}/>

        <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
          Launch demo modal
        </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="etitle" value={note.etitle} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>Update Notes</button>
              </div>
            </div>
          </div>
        </div>

        <div className='row my-3'>
          <h2>Yours Note</h2>
          <div className='container'>
          {notes.length===0 && 'No Notes Availbale Here....'}
          </div>
          {notes.map((note) => {
            return <NotItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}></NotItem>
          })}
        </div>
      </div>
    </>
  )
}
