import React from 'react';
import { Rate } from 'antd';

import './rate-stars.css';

class RateStars extends React.Component {
  handleClickStars = (countStars) => {
    this.props.sendRateStars(this.props.id, countStars);
  };
  render() {
    const { stars } = this.props;
    return <Rate className="card__stars" defaultValue={stars} count={10} onChange={this.handleClickStars} />;
  }
}

export default RateStars;
