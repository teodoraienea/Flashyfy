import React from 'react';
import './Home.css'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); 

    const handleGetStarted = () => {
        navigate('/cards'); 
    };

  return (
    <div className="home-page-container">

      <section className="hero-section">
        <h1 className="hero-title">Welcome to FlashMaster</h1>
        <p className="hero-description">
          Master any topic, one flashcard at a time.
        </p>
        <button className="cta-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </section>

      <section className="features-section">
        <h2 className="features-title">Key Features</h2>
        <div className="features-list">
          <div className="feature">
            <h3>Create Custom Flashcards</h3>
            <p>
              Easily add new cards with questions and answers tailored to your
              study needs.
            </p>
          </div>
          <div className="feature">
            <h3>Organize by Categories</h3>
            <p>
              Sort your cards into categories, making it easier to focus on
              specific topics or subjects.
            </p>
          </div>
          <div className="feature">
            <h3>Searchable Decks</h3>
            <p>
              Quickly find and access your flashcards with a powerful search
              feature that lets you filter by category.
            </p>
          </div>
          <div className="feature">
            <h3>Track Your Progress</h3>
            <p>
              Keep track of which decks you're working on and monitor your
              learning journey.
            </p>
          </div>
          <div className="feature">
            <h3>Beautiful & Simple Design</h3>
            <p>
              An intuitive, user-friendly interface with a clean and visually
              appealing layout, making learning more enjoyable.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Start Learning Smarter</h2>
        <button className="cta-button" onClick={() => alert('Get Started!')}>
          Create Your First Deck
        </button>
      </section>
    </div>
  );
};

export default Home;
