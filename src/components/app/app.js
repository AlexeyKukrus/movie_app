import React from 'react';
import { Input, Pagination } from 'antd';
import { debounce } from 'lodash';

import MovieList from '../movie-list/movie-list';
import fetchMovies from '../../services/fetch-movie-service';
import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      error: false,
      screenWidth: window.innerWidth,
      currentPage: 1,
      inputValue: 'return',
      noResult: false,
    };
  }

  componentDidMount() {
    this.fetchMoviesData();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  handlePaginationChange = (page) => {
    this.setState({ currentPage: page, loading: true }, () => {
      this.fetchMoviesData();
    });
  };

  handleInputChange = debounce((e) => {
    e.preventDefault();
    this.setState({ inputValue: e.target.value, loading: true }, () => {
      this.fetchMoviesData();
    });
  }, 1500);

  fetchMoviesData = async () => {
    const { currentPage, inputValue } = this.state;
    try {
      const movies = await fetchMovies(inputValue, currentPage);
      if (movies.length === 0) {
        this.setState({ movies, loading: false, noResult: true });
      } else {
        this.setState({ movies, loading: false, noResult: false });
      }
    } catch {
      this.setState({ error: true, loading: false });
    }
  };

  render() {
    const { movies, loading, error, screenWidth, currentPage, noResult } = this.state;

    return (
      <div className="container">
        <Input placeholder="Type to search..." className="search-input" onChange={this.handleInputChange} />
        <MovieList movies={movies} loading={loading} error={error} screenWidth={screenWidth} noResult={noResult} />
        <Pagination
          className="pagination"
          defaultCurrent={currentPage}
          total={50}
          onChange={this.handlePaginationChange}
        />
      </div>
    );
  }
}

export default App;
