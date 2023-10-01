import React from 'react';

import MovieItem from '../movie-item/movie-item';
import Paginations from '../pagination/pagination';

import './rated-list.css';

class RatedList extends React.Component {
  constructor() {
    super();
    this.state = {
      dataRated: [],
      page: 0,
      totalPage: 0,
      totalResults: 0,
      screenWidth: window.innerWidth,
    };
  }

  getGuestSession = () => {
    this.props
      .getGuestSession()
      .then((res) => {
        this.setState({
          dataRated: res.results,
          page: res.page,
          totalPage: res.total_pages,
          totalResults: res.total_results,
        });
      })
      .catch((e) => this.props.onEror(e));
  };

  getPageSession = (page) => {
    this.props
      .getPageSession(page)
      .then((res) => {
        this.setState({
          dataRated: res.results,
          page: res.page,
          totalPage: res.total_pages,
          totalResults: res.total_results,
        });
      })
      .catch((e) => this.props.onEror(e));
  };

  componentDidMount() {
    this.getGuestSession();
  }

  render() {
    const { dataRated, totalResults, page, screenWidth, totalPage } = this.state;
    const { pageTab } = this.props;
    if (dataRated.length === 0) return null;
    else
      return (
        <div className="movies">
          <ul className="movies__list">
            {dataRated.map((movie) => {
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
                  rete={movie.rating}
                  countStars={movie.rating}
                  screenWidth={screenWidth}
                />
              );
            })}
          </ul>
          {totalResults > 20 ? (
            <Paginations pageTab={pageTab} getPageSession={this.getPageSession} page={page} totalPage={totalPage} />
          ) : null}
        </div>
      );
  }
}

export default RatedList;
