import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="App-header">
        <h1 onClick={() => navigate('/')}>PersonalJournalApp</h1>

        <span onClick={() => setSidebarOpen(true)}>☰</span>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
};

export default Header;
