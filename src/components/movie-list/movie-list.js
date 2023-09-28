import React from 'react';
import { Spin, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import MovieItemDesktop from '../movie-item-desktop/movie-item-desktop';
import Errors from '../errors/errors';
import MovieItemMobile from '../movie-item-mobile/movie-item-mobile';
import fetchMovies from '../../services/fetch-movie-service';

import './movie-list.css';

function cropText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  const croppedText = text.substr(0, maxLength);
  return `${croppedText.substr(0, Math.min(croppedText.length, croppedText.lastIndexOf(' ')))}...`;
}

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      screenWidth: window.innerWidth,
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.fetchMovies();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  fetchMovies = async () => {
    try {
      const movies = await fetchMovies();
      this.setState({ movies, loading: false });
    } catch {
      this.onError();
    }
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  handleResize = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  render() {
    const { movies, screenWidth, loading, error } = this.state;
    const spinner = loading ? <Spin size="large" /> : null;
    const content = !(loading || error) ? <MovieListView movies={movies} screenWidth={screenWidth} /> : null;
    const errorMessage = error ? <Errors /> : null;
    return (
      <ul className="movies">
        <Online>
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
}

function MovieListView({ movies, screenWidth }) {
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
