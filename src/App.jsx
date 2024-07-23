import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Header from "./components/Header.jsx";
import Inventory from "./pages/Inventory.jsx";
import Logout from "./pages/Logout.jsx";
import { isTokenExpired } from "./api.js";
import './scrolling-background.css'; // Import the custom CSS file
import Sidebar from "./components/Sidebar.jsx";
import EditItem from "./pages/EditItem.jsx";

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }

    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token && isTokenExpired(token)) {
        localStorage.removeItem('token');
        setAuthToken(null);
        navigate('/login');
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / docHeight;
      const bgElement = document.querySelector('.scroll-bg');
      if (bgElement) {
        bgElement.style.backgroundPositionY = `${scrollFraction * 100}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="scroll-bg"></div>
      <div className="content min-h-screen text-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout setAuthToken={setAuthToken} />} />
            <Route path="/inventory" element={<Inventory authToken={authToken} />} />
            <Route path="/inventory/edit/:id" element={<EditItem />} />
            <Route path="*" element={<h1>404: Page not found</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
