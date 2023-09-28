import React from 'react';
import { format } from 'date-fns';
import './movie-item-desktop.css';

function MovieItemDesktop({ movie, shortText }) {
  return (
    <li key={movie.id} className="movies__card">
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="card-image" />
      <div className="movies__description">
        <h5 className="movie__description-title">{movie.title}</h5>
        <p className="movie__description-release">{format(new Date(movie.release_date), 'MMMM dd, yyyy')}</p>
        <p className="movies__description-genre">Action</p>
        <p className="movie__description-paragraph">{shortText}</p>
      </div>
    </li>
  );
}

export default MovieItemDesktop;
