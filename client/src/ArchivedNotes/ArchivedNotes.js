import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import FetchCall from '../fetchCalls';
import NotePreview from '../components/NotePreview/NotePreview';
import './ArchivedNotes.css';
import Header from '../components/header/Header';

const ArchivedNotes = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const loadArchivedNotes = async () => {
      try {
        const response = await FetchCall.note.listArchived();
        if (response.ok) setArchivedNotes(response.data.noteList);
      } catch (error) {
        alert("Chyba při načítání archivovaných poznámek:", error);
      }
    };
    loadArchivedNotes();
  }, []);

  const handleRestore = async (noteId) => {
    try {
      const response = await FetchCall.note.restore({ id: noteId });
      if (response.ok) {
        setArchivedNotes(prev => prev.filter(note => note.id !== noteId));
      }
    } catch (error) {
      alert("Chyba při obnovování poznámky:", error);
    }
  };

  return (
     <div className='App'>
      <Header />
    <div className="archived-notes-container">
      <h1>Archivované poznámky</h1>
      <div className="notes-grid">
        {archivedNotes.map(note => (
          <div key={note.id} className="archived-note-wrapper">
            <NotePreview
              {...note}
              // onClick={() => navigate(`/editNote/${note.id}`)}
            />
            <button 
              onClick={() => handleRestore(note.id)}
              className="restore-button"
            >
              Obnovit
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ArchivedNotes;
