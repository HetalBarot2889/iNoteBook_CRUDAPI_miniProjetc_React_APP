import express from 'express';
import connectDB  from './db.js'
import Auth from './routes/auth.js';
import Note from './routes/notes.js';
import cors from 'cors';
const app = express()
const port = 5000
connectDB();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use("/api/auth", Auth);  
app.use("/api/notes", Note);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
