import express from 'express';
import cors from 'cors';
import noteController from './controller/note.js';
import folderController from './controller/folder.js';

const app = express();
const port = 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Personal Journal App');
});

app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/note', noteController);
app.use('/folder', folderController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
