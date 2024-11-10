import React, { useState, useEffect } from 'react';
import './Cards.css';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [newCard, setNewCard] = useState({ question: '', answer: '', category: '' });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('process.env.REACT_APP_BACKEND_URL/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!newCard.question || !newCard.answer || !newCard.category) {
      setError('All fields are required');
      return;
    }
  
    try {
      const response = await fetch('process.env.REACT_APP_BACKEND_URL/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save card');
      }
  
      const savedCard = await response.json();
      setCards(prevCards => [...prevCards, savedCard]);
  
      setNewCard({ question: '', answer: '', category: '' }); 
      setError('');
    } catch (error) {
      console.error('Error saving card:', error);
      setError('Failed to save card');
    }
  };

  const handleCancel = () => {
    setNewCard({ question: '', answer: '', category: '' });
    setError('');
  };

  const HandleDecks = () =>{
    navigate('/decks');
  }

  return (
    <div className="card-page-container">
      <div className="search-button-container">
        <TextField
          label="Search by Category"
          variant="outlined"
          value={searchCategory}
          onChange={handleSearchChange}
          fullWidth
        />
        <Button className="deck-button" onClick={HandleDecks}>
          My Deck of Cards
        </Button>
      </div>

      <div className="card-form-container">
        <div className="card-form">
          <h3>Create New Flashcard</h3>
          <div className="input-fields">
            <TextField
              label="Question"
              variant="outlined"
              name="question"
              value={newCard.question}
              onChange={handleCardChange}
              fullWidth
            />
            <TextField
              label="Answer"
              variant="outlined"
              name="answer"
              value={newCard.answer}
              onChange={handleCardChange}
              fullWidth
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newCard.category}
                onChange={handleCardChange}
                label="Category"
              >
                <MenuItem value="">Select Category</MenuItem>
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))
                ) : loading ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : (
                  <MenuItem disabled>No categories available</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="card-buttons">
            <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel} fullWidth>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
