import express from 'express';
import fetchuser from '../middleware/fetchuser.js';
import Notes from '../models/Notes.js';
import { body, validationResult } from 'express-validator';
const router = express.Router();

//Route 1: Get the All notesnfrom dataset Call api "api/notes/fetchAllNotes"
router.get('/fetchAllNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server error.");
    }
})

//Route 2: Get the All notesnfrom dataset Call api "api/notes/addNots"
router.post('/addNotes', fetchuser, [
    body('title', 'Invalid title').isLength({ min: 3 }),
    body('description', 'minimum characters use').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await notes.save()
        res.json(saveNote);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured.");
    }
})

//Route 3: To update notes of existing users call this api "api/notes/updateNotes"
router.put('/updateNotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNotes = {};
        if (title) { newNotes.title = title };
        if (description) { newNotes.description = description }
        if (tag) { newNotes.tag = tag };

        //find id and update notes on existing id.
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        res.send(note)
    } catch (error) {
        res.status(500).send("Internal Server error occured.");
    }

})

//Router 4: Delete user note on its own id to use this api for DELETE "api/notes/deleteNotes"
router.delete('/deleteNotes/:id', fetchuser, async (req, res) => {
    try {
        //find id and update notes on existing id.
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "success": "Note has been succesfully deleted", note: note })
    } catch (error) {
        res.status(500).send("Internal Server error occured.");
    }

})
export default router;