import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FetchCall from "../fetchCalls";
import Header from "./header/Header";
import NotePreview from "./NotePreview/NotePreview";

const FolderNotes = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const [notes, setNotes] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const notesResponse = await FetchCall.note.list({ folderId });
        if (notesResponse.ok) {
          setNotes(notesResponse.data.noteList || []);
        }

        const folderResponse = await FetchCall.folder.get({ id: folderId });
        if (folderResponse.ok) {
          setFolderName(folderResponse.data.name);
          setEditedName(folderResponse.data.name);
        }
      } catch (error) {
        alert("Chyba při načítání dat: " + error.message);
      }
    };

    loadData();
  }, [folderId]);

  const handleUpdate = async () => {
    if (!editedName.trim()) return;

    try {
      const response = await FetchCall.folder.update({
        id: folderId,
        name: editedName
      });
      
      if (response.ok) {
        setFolderName(editedName);
        setIsEditing(false);
      }
    } catch (error) {
      alert("Chyba při aktualizaci složky: " + error.message);
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <Header />
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '10px',
        padding: '20px',
        marginBlock: '10px'
      }}>
        {isEditing ? (
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              style={{
                padding: '8px',
                fontSize: '1.2rem',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
            <button
              onClick={handleUpdate}
              style={{
                padding: '8px 16px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Uložit
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedName(folderName);
              }}
              style={{
                padding: '8px 16px',
                background: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Zrušit
            </button>
          </div>
        ) : (
          <>
            <h2 style={{ margin: 0 }}>{folderName}</h2>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '5px'
              }}
            >
              ✏️
            </button>
          </>
        )}
      </div>

      <div style={{ paddingInline: '20px', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {notes.length === 0 ? (
          <p>Žádné poznámky v této složce</p>
        ) : null}
        {notes.map((note) => (
          <NotePreview
            onClick={() => navigate("/editNote/" + note.id)}
            key={note.id}
            title={note.title}
            content={note.content}
            date={note.date}
          />
        ))}
      </div>
    </div>
  );
};

export default FolderNotes;
