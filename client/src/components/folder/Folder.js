import './folder.css'
import folderImg from '../../assets/folder.png';
import { useNavigate } from 'react-router-dom';

export const Folder = (props) => {
  const navigate = useNavigate();
  return (
    <div className="journal-folder" onClick={() => navigate("/folder/" + props.id)}>
        <img src={folderImg} height={84} alt="logo" />
        <span>{props.name}</span>
    </div>
  )
}

