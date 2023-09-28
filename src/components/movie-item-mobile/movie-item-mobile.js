import React from 'react';
import { format } from 'date-fns';
import './movie-item-mobile.css';

function MovieItemMobile({ movie, shortText }) {
  return (
    <li key={movie.id} className="movie__card">
      <div className="card-header">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="card-header_image"
        />
        <div className="card-header__info">
          <h5 className="info__title">{movie.title}</h5>
          <p className="info__release">{format(new Date(movie.release_date), 'MMMM dd, yyyy')}</p>
          <p className="info__genre">Action</p>
        </div>
      </div>
      <p className="card-description">{shortText}</p>
    </li>
  );
}

export default MovieItemMobile;
