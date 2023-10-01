import React from 'react';
import { format } from 'date-fns';

import Genres from '../genres/genres';
import RateStars from '../rate-stars/rate-stars';

import './movie-item.css';

class MovieItem extends React.Component {
  render() {
    const { id, title, dateRelease, description, poster, dataGenres, rating, countStars, sendRateStars, screenWidth } =
      this.props;

    const posterIMG = (poster) => {
      const defoltImage =
        'https://publicimagedata.s3.amazonaws.com/stable_diffusion_thumbnail/1/hyper_realistic_oil_painting_movie_poster_of_a_fat_toad_wearing_anaglyph_red_-_blue_glasses_with_popcorn_pot_vibrant_colors_high_contrast_-H_640_-C_10.0_-n_9_-i_-S_2866264059_ts-1660401670_idx-4_thumbnail.webp';
      const posterImage = `https://image.tmdb.org/t/p/w500${poster}`;
      return poster === null ? defoltImage : posterImage;
    };

    const formatText = (description) => {
      let string = description;
      if (description.length > 200) {
        string = string.slice(0, string.indexOf(' ', 100));
        string += ' ...';
      }
      return string;
    };

    const formatData = (dateRelease) => {
      if (!dateRelease) return null;
      return format(new Date(dateRelease), 'MMMM d, yyyy');
    };

    const getColor = (rating) => {
      let colorRating = 'card__description-rate ';
      if (rating >= 7) return (colorRating += 'super');
      if (rating >= 5 && rating < 7) return (colorRating += 'high');
      if (rating >= 3 && rating < 5) return (colorRating += 'medium');
      if (rating >= 0 && rating < 3) return (colorRating += 'low');
    };

    const getStars = (countStars) => {
      if (countStars === undefined) return 0;
      else return countStars;
    };
    if (screenWidth > 910) {
      return (
        <li className="movie__card">
          <div>
            <img className="card__image" src={posterIMG(poster)}></img>
          </div>
          <div className="card__description">
            <div className="card__description-header">
              <h5 className="card__description-title">{title}</h5>
              <p className={getColor(rating)}>{rating.toFixed(1)}</p>
            </div>
            <p className="movie__description-release">{formatData(dateRelease)}</p>
            <div className="movie__description-genre">
              <Genres dataGenres={dataGenres} />
            </div>
            <p className="movie__description-paragraph">{formatText(description)}</p>
            <RateStars sendRateStars={sendRateStars} stars={getStars(countStars)} id={id} />
          </div>
        </li>
      );
    }
    return (
      <li className="movie__card">
        <div className="card__info">
          <img className="card__image" src={posterIMG(poster)}></img>
          <div className="card__description-header">
            <div>
              <h5 className="card__description-title">{title}</h5>
              <p className="movie__description-release">{formatData(dateRelease)}</p>
              <div className="movie__description-genre">
                <Genres dataGenres={dataGenres} />
              </div>
            </div>
            <p className={getColor(rating)}>{rating.toFixed(1)}</p>
          </div>
        </div>
        <p className="movie__description-paragraph">{formatText(description)}</p>
        <RateStars sendRateStars={sendRateStars} stars={getStars(countStars)} id={id} />
      </li>
    );
  }
}

export default MovieItem;
