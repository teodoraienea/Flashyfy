import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.css';
import Cards from './pages/Cards/Cards';
import Home from './pages/Home/Home';
import Header from './components/Header';
import Login from './pages/login/login'; 
import Register from './pages/Register/register';
import FlashcardPage from './pages/Review/review';
import CurrentCards from './pages/current_cards/current_cards';


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
        <Route path="/decks" element={<CurrentCards />} />
        <Route path="review/:deckId" element={<FlashcardPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
   
  );
}

export default App;
