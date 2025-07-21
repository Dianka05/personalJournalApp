import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FetchCall from '../fetchCalls';
import './note.css';
import Header from '../components/header/Header';

function Note()  {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const foldersResponse = await FetchCall.folder.list();
        if (foldersResponse.ok) {
          setFolders(foldersResponse.data.folderList || []);
        }

        if (id) {
          setIsLoading(true);
          const noteResponse = await FetchCall.note.get({ id });
          if (noteResponse.ok) {
            setNote(noteResponse.data);
          }
          setIsLoading(false);
        }
      } catch (error) {
        alert("Chyba při načítání dat:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleArchive = async () => {
    try {
      const response = await FetchCall.note.archive({ id });
      if (response.ok) navigate('/listArchived');
    } catch (error) {
      alert("Chyba při archivaci:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const folderId = note.folderId === undefined ? null : note.folderId;
    console.log(folderId)
    try {
      const dtoIn = {
        id: note.id,
        title: note.title,
        content: note.content,
        // folderId: folderId
      };

      if (folderId) {
        dtoIn.push(folderId);
      }

      const response = id 
        ? await FetchCall.note.update(dtoIn)
        : await FetchCall.note.create(dtoIn);

      if (response.ok) navigate('/');
    } catch (error) {
      alert("Chyba při ukládání:", error.data.validationError);
    }
  };


  if (isLoading) {
    return <div>Načítání...</div>;
  }

  return (
    <div className="note-container">
      <Header />

      <form onSubmit={handleSubmit} className="note-form">
        <div className="note-actions">
          <select
            name="folderId"
            value={note.folderId || ""}
            onChange={handleChange}
            className="select-folder"
          >
            <option>Select Folder</option>
            {folders.map(folder => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>

          {id && <button 
            onClick={handleArchive}
            className="save-button"
          >
            Archivovat
          </button>}
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Title"
          className="note-title-input"
        />

        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="My list :
                      - Items 1
                      - Items 2
                      - Items 3"
          className="note-content"
        />
      </form>
    </div>
  );
};

export default Note;
