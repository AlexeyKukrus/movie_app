import React from 'react';

import Context from '../context/context';

import './genres.css';

class Genres extends React.Component {
  render() {
    const { dataGenres } = this.props;
    return (
      <Context.Consumer>
        {(value) => {
          let genreNames = dataGenres.map((item) => {
            let getItem = value.find((el) => el.id === item);
            return getItem?.name;
          });
          let genres = genreNames.slice(0, 3).map((name, id) => {
            return (
              <span key={id} className="genre">
                {name}
              </span>
            );
          });
          return genres;
        }}
      </Context.Consumer>
    );
  }
}

export default Genres;
