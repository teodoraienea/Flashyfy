import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.css';
import Cards from './pages/Cards/Cards';
import Home from './pages/Home/Home';
import Header from './components/Header';
import Login from './pages/login/login'; 
import Register from './pages/login/register'; 

function App() {
  const location = useLocation();

  const hideHeaderPaths = ['/login', '/register'];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} /> {/* Redirects to Login if no match */}
      </Routes>
    </>
   
  );
}

export default App;
