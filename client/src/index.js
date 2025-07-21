import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Note from './note/Note';
import './index.css';
import FolderNotes from './components/FolderNotes';
import ArchivedNotes from './ArchivedNotes/ArchivedNotes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/folder/:folderId" element={<FolderNotes />} />
        <Route path="/addNote" element={<Note />} />
        <Route path="/editNote/:id" element={<Note />} />
        <Route path="/listArchived" element={<ArchivedNotes />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
