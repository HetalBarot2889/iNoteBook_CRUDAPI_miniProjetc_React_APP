import React,{ useContext} from 'react'
import noteContex from '../context/notes/noteContext'

export default function NotItem(props) {
    const context = useContext(noteContex);
    const { deleteNotes } = context;

    const { note, updateNote } = props
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title"> {note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNotes(note._id); props.showAlert("Deleted Successfully","success");}}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                </div>
            </div>
        </div>
    )
}
