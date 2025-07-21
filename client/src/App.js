import { Folder } from "./components/folder/Folder";
import NotePreview from "./components/NotePreview/NotePreview";
import './App.css';
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import FetchCall from "./fetchCalls";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [showAddButtons, setShowAddButtons] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const foldersResponse = await FetchCall.folder.list();
      if (foldersResponse.ok) {
        setFolders(foldersResponse.data.folderList || []);
      }
      
      const notesResponse = await FetchCall.note.list();
      if (notesResponse.ok) {
        setNotes(notesResponse.data.noteList || []);
      }
    } catch (error) {
      alert("Chyba při načítání dat:", error);
    }
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    
    try {
      const response = await FetchCall.folder.create({ name: folderName });
      if (response.ok) {
        setFolders([...folders, response.data]);
        setFolderName("");
        setShowFolderInput(false);
        setShowAddButton(true);

      } else {
        alert("Chyba při vytváření složky, jmeno složky je již obsazené");
      }
    } catch (error) {
      alert("Chyba při vytváření složky");
    }
  };
  return (
    <div className="App">
      <Header title="PersonalJournalApp" />
      
      <div className="journal-folders-container">
        {folders.map((folder, index) => (
          <Folder name={folder.name} id={folder.id} key={folder.id || index} />
        ))}
      </div>

      
      <div className="journal-content-container">
        <div className="journal-content">
          {notes
            .filter(note => !note.folderId)
            .map((note, index) => (
              <NotePreview
                onClick={() => navigate("/editNote/" + note.id)}
                content={note.content}
                title={note.title}
                date={note.date}
                key={index}
              />
            ))}
        </div>
      </div>

      {showFolderInput && (
        <div className="input-form folder-form">
          <input
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Název složky"
          />
          <button onClick={handleCreateFolder}>Přidat</button>
          <button onClick={() => {
            setShowFolderInput(false)
            setShowAddButton(true);

            }}>Zrušit</button>
        </div>
      )}
      {showAddButtons && (
        <div className="action-buttons">
          <button 
            className="add-folder-btn" 
            onClick={() => {
              setShowFolderInput(true);
              setShowAddButton(false);
              setShowAddButtons(false);
            }}
          >
            Add folder
          </button>
          <button 
            className="add-note-btn" 
            onClick={() => {
              navigate('/addNote');
              setShowAddButtons(false);
            }}
          >
            Add note
          </button>
        </div>
      )}

      {showAddButton && (
         <button 
          className="fab-button"
          onClick={() => setShowAddButtons(!showAddButtons)}
         >
        {showAddButtons ? '−' : '+'}
      </button>
      )}
      
    </div>
  );
}

export default App;
