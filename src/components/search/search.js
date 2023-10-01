import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

import './search.css';
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
    };
  }

  handleChange = debounce((e) => {
    const query1 = e.target.value;
    this.setState({ query: query1 });
    this.props.searchMovie(query1);
  }, 500);

  render() {
    return (
      <Input
        className="movies__search"
        placeholder="Type to search..."
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default Search;
