import React from 'react';

import MovieItemDesktop from '../movie-item-desktop/movie-item-desktop';
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
    const movies = await fetchMovies();
    this.setState({ movies });
  };

  handleResize = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  render() {
    const { movies, screenWidth } = this.state;
    return (
      <ul className="movies">
        {movies.map((movie) => {
          if (screenWidth > 910) {
            return <MovieItemDesktop key={movie.id} movie={movie} shortText={cropText(movie.overview, 150)} />;
          }
          return <MovieItemMobile key={movie.id} movie={movie} shortText={cropText(movie.overview, 300)} />;
        })}
      </ul>
    );
  }
}
export default MovieList;
