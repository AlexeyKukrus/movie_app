import { Component } from 'react';

import Search from '../search/search';
import MovieItem from '../movie-item/movie-item';
import Paginations from '../pagination/pagination';
import ConnectionError from '../connection-error/connection-error';
import FoundError from '../found-error/found-error';
import Loading from '../loading/loading';

import './movie-list.css';

class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      queryMovie: '',
      movies: [],
      noResult: false,
      page: 0,
      totalPage: null,
      isLoading: false,
    };
  }

  searchMovie = (movieName) => {
    this.setState({ isLoading: true });
    if (movieName.trim() !== '') {
      this.props
        .getAllMovies(movieName)
        .then((res) => {
          if (res.results.length !== 0) {
            this.setState({
              queryMovie: movieName,
              movies: res.results,
              totalPage: res.total_pages,
              page: res.page,
              isLoading: false,
              noResult: false,
            });
          } else {
            this.setState({
              isLoading: false,
              noResult: true,
            });
          }
        })
        .catch((e) => {
          this.setState({ isLoading: false });
          this.props.onError(e);
        });
    }
  };

  searchPageMovie = (movieName, numPage) => {
    this.setState({ isLoading: true });
    this.props
      .getPageMovies(`${movieName}`, `${numPage}`)
      .then((res) => {
        this.setState({
          queryMovie: movieName,
          movies: res.results,
          totalPage: res.total_pages,
          page: res.page,
          isLoading: false,
        });
      })
      .catch((e) => {
        this.setState({ isLoading: false });
        this.props.onError(e);
      });
  };

  render() {
    const { movies, totalPage, page, queryMovie, noResult, isLoading } = this.state;
    const { pageTab, sendRateStars, screenWidth } = this.props;
    return (
      <div className="movies">
        <Search searchMovie={this.searchMovie} />
        <ConnectionError />
        {isLoading ? <Loading /> : null}
        {movies.length === 0 && noResult ? <FoundError /> : null}
        <div>
          <ul className="movies__list">
            {movies.map((movie) => {
              return (
                <MovieItem
                  poster={movie.poster_path}
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  dateRelease={movie.release_date}
                  description={movie.overview}
                  dataGenres={movie.genre_ids}
                  rating={movie.vote_average}
                  countStars={movie.rating}
                  sendRateStars={sendRateStars}
                  screenWidth={screenWidth}
                />
              );
            })}
          </ul>
        </div>
        {movies.length > 0 ? (
          <Paginations
            pageTab={pageTab}
            searchPageMovie={this.searchPageMovie}
            page={page}
            totalPage={totalPage}
            queryMovie={queryMovie}
          />
        ) : null}
      </div>
    );
  }
}
export default MovieList;
