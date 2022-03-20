import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  let content = <p>No movies found.</p>;

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await (await fetch('https://swapi.dev/api/films'));

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
      
      const data = await response.json();

      const transformed = data.results.map((item) => {
        return {
          id: item.episode_id,
          title: item.title,
          openingText: item.opening_crawl,
          releaseDate: item.release_date,
        };
      });
  
      setMovies(transformed);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    content = <p>Please wait...</p>
  }

  if (!isLoading && error) {
    content = <p>{error}</p>
  }

  if (!isLoading && movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
