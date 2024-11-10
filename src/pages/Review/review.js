import React, { useState, useEffect } from "react";
import "./review.css";
import { useParams } from 'react-router-dom';

const FlashcardPage = () => {
    const { deckId } = useParams();
    const [isFlipped, setIsFlipped] = useState(false);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/flashcards?deckId=${deckId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch flashcards.');
                }
                return response.json(); 
            })
            .then(data => {
                setFlashcards(data);
                setLoading(false); 
            })
            .catch(error => {
                setError(error.message); 
                setLoading(false);
            });
    }, [deckId]);

    const randomCardIndex = Math.floor(Math.random() * flashcards.length);
    const [currentCard, setCurrentCard] = useState(flashcards[randomCardIndex]);

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    };

    const handleSubmitAnswer = () => {
        setFeedback(answer.trim().toLowerCase() === currentCard.answer.toLowerCase() ? "Correct!" : "Incorrect");
    };

    const handleShowAnswer = () => {
        setIsFlipped(prev => !prev);
    };

    const handleNextQuestion = () => {
        setIsFlipped(false);
        setAnswer("");
        setFeedback(null);
        const newCardIndex = Math.floor(Math.random() * flashcards.length);
        setCurrentCard(flashcards[newCardIndex]);
    };

    if (loading) {
        return <div>Loading flashcards...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flashcard-container">
            <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
                <div className="card-front">
                    <h2>{currentCard.question}</h2>
                    <input
                        type="text"
                        placeholder="Your answer here"
                        value={answer}
                        onChange={handleAnswerChange}
                    />
                </div>
                <div className="card-back">
                    <h3>{currentCard.answer}</h3>
                </div>
            </div>
            <div className="button-container">
                <button onClick={handleSubmitAnswer}>Submit Answer</button>
                <button onClick={handleShowAnswer}>Show Answer</button>
                <button onClick={handleNextQuestion}>Next Question</button>
            </div>
            {feedback && (
                <div className={`feedback-message ${feedback === "Correct!" ? "correct" : "incorrect"}`}>
                    <h3>{feedback}</h3>
                </div>
            )}
        </div>
    );
};

export default FlashcardPage;
