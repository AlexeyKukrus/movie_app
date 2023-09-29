import React from 'react';
import { Spin, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import MovieItemDesktop from '../movie-item-desktop/movie-item-desktop';
import MovieItemMobile from '../movie-item-mobile/movie-item-mobile';

import './movie-list.css';

function cropText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  const croppedText = text.substr(0, maxLength);
  return `${croppedText.substr(0, Math.min(croppedText.length, croppedText.lastIndexOf(' ')))}...`;
}

function MovieList({ movies, screenWidth, loading, error, noResult }) {
  const spinner = loading ? <Spin size="large" /> : null;
  const content = !(loading || error || noResult) ? <MovieListView movies={movies} screenWidth={screenWidth} /> : null;
  const errorMessage = error ? (
    <Alert message="Sorry, but the page you requested does not exist or cannot be found." type="error" />
  ) : null;
  const resultMessage = noResult ? <Alert message="No Results" type="info" /> : null;
  return (
    <ul className="movies">
      <Online>
        {resultMessage}
        {errorMessage}
        {spinner}
        {content}
      </Online>
      <Offline>
        <Alert message="No internet connection. Please check your network settings" type="warning" />
      </Offline>
    </ul>
  );
}

function MovieListView({ movies, screenWidth }) {
  console.log(movies);
  return (
    <>
      {movies.map((movie) => {
        if (screenWidth > 910) {
          return <MovieItemDesktop key={movie.id} movie={movie} shortText={cropText(movie.overview, 150)} />;
        }
        return <MovieItemMobile key={movie.id} movie={movie} shortText={cropText(movie.overview, 300)} />;
      })}
    </>
  );
}
export default MovieList;
