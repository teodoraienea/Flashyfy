import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './current_cards.css';

export default function CurrentCards() {
    const [decks, setDecks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const response = await fetch('https://your-backend-url.com/api/decks');
                if (!response.ok) {
                    throw new Error('Failed to fetch decks');
                }
                const data = await response.json();
                setDecks(data);  
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDecks();
    }, []); 

    const handleDeckClick = (deckId) => {
        navigate(`/review/${deckId}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="review-page">
            <h1>Your Decks of Flash Cards</h1>
            <div className="deck-buttons">
                {decks.map(deck => (
                    <button
                        key={deck.id}
                        className="deck-button"
                        onClick={() => handleDeckClick(deck.id)}
                    >
                        {deck.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
