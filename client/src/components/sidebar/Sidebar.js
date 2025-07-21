import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ open, onClose }) => {
  return (
    <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={onClose}>
      <nav className={`sidebar ${open ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
        <button className="sidebar-close" onClick={onClose}>×</button>
        <ul>
          <li>
            <Link to="/listArchived" onClick={onClose}>Archivované poznámky</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
