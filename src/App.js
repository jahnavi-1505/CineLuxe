// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TopMoviesCarousel from './components/TopMoviesCarousel';
import MovieModal from './components/MovieModal';
import AuthModal from './components/AuthModal';
import AppBanner from './components/AppBanner';
import Footer from './components/Footer';
import FoodPage from './components/Foodpage';
import SummaryPage from './components/SummaryPage'; 

const moviesData = [
  {
    id: 1,
    title: "Avengers: Endgame",
    image: "/images/avengers.jpg",
    rating: "8.4/10",
    info: "Action, Sci-Fi",
    showTimings: ["12:00 PM", "3:00 PM", "7:00 PM", "10:00 PM"]
  },
  {
    id: 2,
    title: "Inception",
    image: "/images/inception.jpg",
    rating: "8.8/10",
    info: "Action, Thriller",
    showTimings: ["1:00 PM", "4:00 PM", "8:00 PM"]
  },
  {
    id: 3,
    title: "Interstellar",
    image: "/images/interstellar.jpg",
    rating: "8.6/10",
    info: "Adventure, Drama, Sci-Fi",
    showTimings: ["11:00 AM", "2:00 PM", "6:00 PM", "9:00 PM"]
  }
];

// 💡 HomePage component for routing
function HomePage({
  darkMode,
  toggleDarkMode,
  searchTerm,
  setSearchTerm,
  authMode,
  setAuthMode,
  setShowAuthModal,
  showAuthModal,
}) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const filteredMovies = moviesData.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AppBanner />
      <div className="container py-3">
        <TopMoviesCarousel />
        <h1 className="text-center mb-4">Now Showing</h1>
        <div className="row">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="col-md-4">
              <div className={`card mb-4 shadow-sm ${darkMode ? "bg-dark text-white" : ""}`}>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="card-img-top movie-img"
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    <strong>Rating:</strong> {movie.rating}
                    <br />
                    <strong>Genre:</strong> {movie.info}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredMovies.length === 0 && (
            <div className="col-12 text-center">
              <p>No movies found.</p>
            </div>
          )}
        </div>

        {/* Movie Modal */}
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            onProceed={(data) => {
              setSelectedMovie(null);
              navigate("/food", { state: data });
            }}
          />
        )}

        {/* Auth Modal */}
        {showAuthModal && (
          <AuthModal
            mode={authMode}
            onClose={() => setShowAuthModal(false)}
            onSwitchMode={(mode) => setAuthMode(mode)}
          />
        )}
      </div>
    </>
  );
}

// Main App Component
function App() {
  const [authMode, setAuthMode] = useState("login");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <nav className={`navbar ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
          <div className="container">
            <a className="navbar-brand" href="#">CineLuxe</a>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search movies"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <div>
              <button
                className={`btn me-2 ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                }}
              >
                Login
              </button>
              <button
                className={`btn me-2 ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}
                onClick={() => {
                  setAuthMode("signup");
                  setShowAuthModal(true);
                }}
              >
                Sign Up
              </button>
              <button
                className={`btn ${darkMode ? "btn-warning" : "btn-dark"}`}
                onClick={toggleDarkMode}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                authMode={authMode}
                setAuthMode={setAuthMode}
                showAuthModal={showAuthModal}
                setShowAuthModal={setShowAuthModal}
              />
            }
          />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/summary" element={<SummaryPage />} /> {/* 🔥 New summary page route */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
